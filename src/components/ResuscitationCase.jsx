import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import PageHeader from './PageHeader'

function ResuscitationCase() {
  const [formData, setFormData] = useState({
    startTime: '',
    cyclesOnSite: '',
    transferTime: '',
    rhythm: [],
    shocksGiven: '',
    airwayManagement: [],
    vascularAccess: [],
    lucasDevice: [],
    medications: [],
    medicationsUsed: '', // نعم أو لا
    additionalTeamSupport: '',
    hospitalArrivalTime: '',
    resuscitationDuration: '',
    totalCycles: '',
    notes: '',
    endOfResuscitation: '',
returnOfPulseTime: ''
  })

  const [generatedReport, setGeneratedReport] = useState('')
  const [summary, setSummary] = useState('')

  // بيانات النموذج بناءً على الملف المرجعي المحدث
  const rhythmOptions = [
    'رجفان بطيني',
    'تسارع بطيني بدون كهربائية',
    'كهربائية بدون نبض',
    'بدون نبض وكهربائية'
  ]

  const airwayOptions = [
    'مجرى هواء فموي',
    'عملية تنبيب',
    'LMA'
  ]

  const vascularAccessOptions = [
    'وريدي',
    'عظمي'
  ]

  const lucasOptions = [
    'تم استخدام جهاز لوكس',
    'لم يستخدم لوكس بسبب وجوده مع فرقة أخرى',
    'لم يستخدم لوكس بسبب الحالة وزن زائد',
    'لم يستخدم لوكس بسبب الحالة طفل',
    'تم تثبيت الحالة على لوح خشبي'
  ]

  const medicationOptions = [
    'أدرينالين',
    'أميودارون',
    'أتروبين',
    'بيكربونات الصوديوم'
  ]

  const additionalTeamOptions = [
    'نعم',
    'لا'
  ]

  // حساب مدة الإنعاش تلقائياً (من وقت البدء إلى وقت الوصول للمستشفى)
  useEffect(() => {
    if (formData.startTime && formData.hospitalArrivalTime) {
      const start = new Date(`2024-01-01T${formData.startTime}:00`)
      const end = new Date(`2024-01-01T${formData.hospitalArrivalTime}:00`)
      
      // إذا كان وقت الوصول في اليوم التالي
      if (end < start) {
        end.setDate(end.getDate() + 1)
      }
      
      const diffInMinutes = Math.floor((end - start) / (1000 * 60))
      
      if (diffInMinutes > 0) {
        setFormData(prev => ({
          ...prev,
          resuscitationDuration: diffInMinutes.toString()
        }))
      }
    }
  }, [formData.startTime, formData.hospitalArrivalTime])

  // حساب عدد الدورات تلقائياً (كل دقيقتين = 5 دورات)
  useEffect(() => {
    if (formData.resuscitationDuration) {
      const duration = parseInt(formData.resuscitationDuration)
      if (!isNaN(duration)) {
        const cycles = Math.floor((duration / 2) * 5)
        setFormData(prev => ({
          ...prev,
          totalCycles: cycles.toString()
        }))
      }
    }
  }, [formData.resuscitationDuration])

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

const generateReport = () => {
  const template = `عند وصول الفرقة الإسعافية وجد الحالة غير واعي بدون نبض وتنفس وتم بدء عملية الإنعاش القلبي الرئوي في تمام الساعة ${formData.startTime} وتم تركيب جهاز AED وظهر على الشاشة نمط ${formData.rhythm.join(' و ')}${formData.shocksGiven ? ` وتم إعطاء ${formData.shocksGiven} صدمة` : ''} فتح مجرى الهواء عن طريق ${formData.airwayManagement.join(' و ')} وإكمال عملية الإنعاش وتم عمل ${formData.cyclesOnSite} دورات في الموقع ونقل الحالة إلى الإسعاف في تمام الساعة ${formData.transferTime} ${formData.lucasDevice.join(' و ')} وفتح مجرى ${formData.vascularAccess.join(' و ')} واستكمال عملية الإنعاش حتى الوصول إلى المستشفى${formData.endOfResuscitation 
    ? `، ${formData.endOfResuscitation}${formData.endOfResuscitation === 'رجوع النبض قبل الوصول للمستشفى' && formData.returnOfPulseTime ? ` في تمام الساعة ${formData.returnOfPulseTime}` : ''}` 
    : ''}، مدة الإنعاش بالكامل  ${formData.resuscitationDuration} دقيقة، عدد الدورات ${formData.totalCycles}${formData.shocksGiven ? `، عدد الصدمات المعطاة ${formData.shocksGiven}` : ''}${formData.medicationsUsed === 'نعم' && formData.medications.length > 0 ? '، تم استخدام الأدوية: ' + formData.medications.join(' و ') : formData.medicationsUsed === 'نعم' ? '، تم استخدام أدوية' : ''}${formData.additionalTeamSupport === 'نعم' ? '، تم دعم بفرقة أخرى' : ''}${formData.notes ? `\n\nملاحظات إضافية: ${formData.notes}` : ''}`

    const summaryText = `ملخص:
وقت بدء الإنعاش: ${formData.startTime}
عدد الدورات في الموقع: ${formData.cyclesOnSite}
وقت نقل الحالة إلى الإسعاف: ${formData.transferTime}
النظم الظاهر: ${formData.rhythm.join(' و ') || 'لم يتم التحديد'}
عدد الصدمات: ${formData.shocksGiven || 'لم يعطى'}
مدة الإنعاش بالكامل: ${formData.resuscitationDuration} دقيقة
فتح مجرى الهواء: ${formData.airwayManagement.join(' و ') || 'لم يتم التحديد'}
فتح مجرى: ${formData.vascularAccess.join(' و ') || 'لم يتم التحديد'}
عدد الدورات كاملة: ${formData.totalCycles || 'غير محسوبة'}
استخدام الأدوية: ${formData.medicationsUsed === 'نعم' ? (formData.medications.length > 0 ? formData.medications.join(' و ') : 'نعم (لم يتم تحديد الأدوية)') : 'لا'}
دعم فرقة أخرى: ${formData.additionalTeamSupport || 'لم يتم التحديد'}${formData.notes ? `\nملاحظات إضافية: ${formData.notes}` : ''}`

    setGeneratedReport(template)
    setSummary(summaryText)
  }

  const translateReport = (text) => {
    const translations = {
      // الجمل الأساسية
      'عند وصول الفرقة الإسعافية': 'Upon arrival of the ambulance team',
      'وجد الحالة غير واعي بدون نبض وتنفس': 'found the patient unconscious without pulse and breathing',
      'وتم بدء عملية الإنعاش القلبي الرئوي': 'and cardiopulmonary resuscitation (CPR) was initiated',
      'في تمام الساعة': 'at',
      'وتم تركيب جهاز AED': 'and AED device was attached',
      'وظهر على الشاشة نمط': 'and the screen showed rhythm',
      'فتح مجرى الهواء عن طريق': 'airway management via',
      'وإكمال عملية الإنعاش': 'and resuscitation continued',
      'وتم عمل': 'and performed',
      'دورات في الموقع': 'cycles on scene',
      'ونقل الحالة إلى الإسعاف': 'and transferred patient to ambulance',
      'وفتح مجرى': 'and vascular access via',
      'واستكمال عملية الإنعاش حتى الوصول إلى المستشفى': 'and continued resuscitation until arrival at hospital',
      'مدة الإنعاش بالكامل': 'total resuscitation duration',
      'دقيقة': 'minutes',
      'عدد الدورات': 'number of cycles',
      'عدد الصدمات المعطاة': 'number of shocks delivered',
      'تم استخدام الأدوية:': 'medications used:',
      'تم دعم بفرقة أخرى': 'additional team support provided',
      'ملاحظات إضافية:': 'Additional notes:',
      
      // النظم القلبية - مصطلحات طبية دقيقة
      'رجفان بطيني': 'ventricular fibrillation (VF)',
      'تسارع بطيني بدون كهربائية': 'pulseless ventricular tachycardia (pVT)',
      'كهربائية بدون نبض': 'pulseless electrical activity (PEA)',
      'بدون نبض وكهربائية': 'asystole',
      'وتم إعطاء': 'and delivered',
      'صدمة': 'shock(s)',
      
      // إدارة مجرى الهواء - مصطلحات طبية
      'مجرى هواء فموي': 'oropharyngeal airway (OPA)',
      'عملية تنبيب': 'endotracheal intubation (ETI)',
      'LMA': 'laryngeal mask airway (LMA)',
      
      // الوصول الوعائي - مصطلحات طبية
      'وريدي': 'intravenous (IV) access',
      'عظمي': 'intraosseous (IO) access',
      
      // جهاز لوكس - مصطلحات طبية
      'تم استخدام جهاز لوكس': 'LUCAS mechanical CPR device was utilized',
      'لم يستخدم لوكس بسبب وجوده مع فرقة أخرى': 'LUCAS device not used as it was with another team',
      'لم يستخدم لوكس بسبب الحالة وزن زائد': 'LUCAS device not used due to patient obesity',
      'لم يستخدم لوكس بسبب الحالة طفل': 'LUCAS device not used due to pediatric patient',
      'تم تثبيت الحالة على لوح خشبي':'Patient put on the backboard',

      
      // الأدوية - أسماء علمية
      'أدرينالين': 'epinephrine (adrenaline)',
      'أميودارون': 'amiodarone',
      'أتروبين': 'atropine',
      'بيكربونات الصوديوم': 'sodium bicarbonate',
      
      // كلمات ربط وأخرى
      'لم يعطى': 'Not given',
      'و ': ' and ',
      'في ': ' at ',
      'لا': 'no',
      'نعم': 'yes',
      'لا يوجد': 'none',
      'لم يتم تحديد': 'not specified',
      'رجوع النبض قبل الوصول للمستشفى': 'return of pulse before hospital arrival',
      'استكمال الإنعاش داخل قسم الطوارئ  ورجوع النبض': 'resuscitation continued in ER with pulse return',
      'استكمال الإنعاش داخل قسم الطوارئ وإعلان الوفاة': 'resuscitation continued in ER  death declared',
      'في تمام الساعة': 'at'
    }

    let translatedText = text
    
    // ترجمة النص بالترتيب الصحيح لتجنب خلط اللغات
    Object.entries(translations).forEach(([arabic, english]) => {
      const regex = new RegExp(arabic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      translatedText = translatedText.replace(regex, english)
    })

    return translatedText
  }

  const translateSummary = (text) => {
    const translations = {
  'ملخص:': 'Summary:',
  'وقت بدء الإنعاش:': 'Resuscitation start time:',
  'عدد الدورات في الموقع:': 'Number of cycles on scene:',
  'وقت نقل الحالة إلى الإسعاف:': 'Transfer time to ambulance:',
  'النظم الظاهر:': 'Detected rhythm(s):',
  'عدد الصدمات:': 'Number of shocks:',
  'مدة الإنعاش بالكامل:': 'Total resuscitation duration:',
  'فتح مجرى الهواء:': 'Airway management:',
  'فتح مجرى:': 'Vascular access:',
  'عدد الدورات كاملة:': 'Total number of cycles:',
  'استخدام الأدوية:': 'Medications administered:',
  'دعم فرقة أخرى:': 'Additional team support:',
  'ملاحظات إضافية:': 'Additional notes:',
  'دقيقة': 'minutes',
  'لا': 'no',
  'نعم': 'yes',
  'لم يتم التحديد': 'not specified',
  'غير محسوبة': 'not calculated',
      
      // النظم
      'رجفان بطيني': 'ventricular fibrillation (VF)',
      'تسارع بطيني بدون كهربائية': 'pulseless ventricular tachycardia (pVT)',
      'كهربائية بدون نبض': 'pulseless electrical activity (PEA)',
      'بدون نبض وكهربائية': 'asystole',
      
      // إدارة مجرى الهواء
      'مجرى هواء فموي': 'oropharyngeal airway (OPA)',
      'عملية تنبيب': 'endotracheal intubation (ETI)',
      'LMA': 'laryngeal mask airway (LMA)',

      // مجرى 
      'وريدي':'IV Access',
      'عظمي':'IO Access',
      // الأدوية
      'أدرينالين': 'epinephrine',
      'أميودارون': 'amiodarone',
      'أتروبين': 'atropine',
      'بيكربونات الصوديوم': 'sodium bicarbonate',
      'لم يعطى': 'Not given',
      'و ': ' and ',
      'لا': 'no',
      'نعم': 'yes',
      'لايوجد': 'none',
      'لم يتم تحديد': 'not specified'
    }

    let translatedText = text
    Object.entries(translations).forEach(([arabic, english]) => {
      const regex = new RegExp(arabic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      translatedText = translatedText.replace(regex, english)
    })

    return translatedText
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="حالة إنعاش" 
        titleEn="Resuscitation Case"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* التعليمات الهامة */}
          <Card className="mb-8 border-red-500 border-2">
            <CardHeader>
              <CardTitle className="text-3xl arabic-font rtl text-red-600">
                تعليمات هامة - التواصل مع التوجيه الطبي
              </CardTitle>
              <CardTitle className="text-2xl text-red-600">
                Important Instructions - Medical Control Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-xl arabic-font rtl font-semibold text-red-800 mb-2">
                    يجب التواصل مع التوجيه الطبي لإعطاء معلومات الحالة بالكامل:
                  </p>
                  <ul className="text-lg arabic-font rtl text-red-700 space-y-1">
                    <li>• الاسم الكامل للمريض</li>
                    <li>• رقم الهوية</li>
                    <li>• معلومات الملخص الموجودة أسفل التقرير</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-lg font-semibold text-red-800 mb-2">
                    Contact medical control with complete patient information:
                  </p>
                  <ul className="text-md text-red-700 space-y-1">
                    <li>• Patient's full name</li>
                    <li>• National ID number</li>
                    <li>• Summary information provided below the report</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* نموذج الإدخال */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl arabic-font rtl">
                بيانات حالة الإنعاش القلبي الرئوي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* وقت بدء الإنعاش */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  وقت بدء الإنعاش
                </h3>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-48 text-xl"
                />
              </div>

              {/* عدد الدورات في الموقع */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  عدد الدورات في الموقع
                </h3>
                <Input
                  type="number"
                  placeholder="عدد الدورات"
                  value={formData.cyclesOnSite}
                  onChange={(e) => handleInputChange('cyclesOnSite', e.target.value)}
                  className="w-48 text-xl"
                />
              </div>

              {/* وقت نقل الحالة إلى الإسعاف */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  وقت نقل الحالة إلى الإسعاف
                </h3>
                <Input
                  type="time"
                  value={formData.transferTime}
                  onChange={(e) => handleInputChange('transferTime', e.target.value)}
                  className="w-48 text-xl"
                />
              </div>

              {/* النظم الظاهر */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  النظم الظاهر
                </h3>
                <div className="space-y-4">
                  {rhythmOptions.map((rhythm) => (
                    <div key={rhythm} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={rhythm}
                        checked={formData.rhythm.includes(rhythm)}
                        onCheckedChange={() => handleCheckboxChange('rhythm', rhythm)}
                      />
                      <label htmlFor={rhythm} className="text-xl arabic-font">
                        {rhythm}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* عدد الصدمات المعطاة */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  عدد الصدمات المعطاة
                </h3>
                <Input
                  type="number"
                  placeholder="عدد الصدمات"
                  value={formData.shocksGiven}
                  onChange={(e) => handleInputChange('shocksGiven', e.target.value)}
                  className="w-48 text-xl"
                />
              </div>

              {/* فتح مجرى الهواء */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  فتح مجرى الهواء
                </h3>
                <div className="space-y-4">
                  {airwayOptions.map((airway) => (
                    <div key={airway} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={airway}
                        checked={formData.airwayManagement.includes(airway)}
                        onCheckedChange={() => handleCheckboxChange('airwayManagement', airway)}
                      />
                      <label htmlFor={airway} className="text-xl arabic-font">
                        {airway}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* فتح مجرى */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  فتح مجرى
                </h3>
                <div className="space-y-4">
                  {vascularAccessOptions.map((access) => (
                    <div key={access} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={access}
                        checked={formData.vascularAccess.includes(access)}
                        onCheckedChange={() => handleCheckboxChange('vascularAccess', access)}
                      />
                      <label htmlFor={access} className="text-xl arabic-font">
                        {access}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* جهاز لوكس */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  جهاز لوكس
                </h3>
                <div className="space-y-4">
                  {lucasOptions.map((lucas) => (
                    <div key={lucas} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={lucas}
                        checked={formData.lucasDevice.includes(lucas)}
                        onCheckedChange={() => handleCheckboxChange('lucasDevice', lucas)}
                      />
                      <label htmlFor={lucas} className="text-xl arabic-font">
                        {lucas}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* استخدام الأدوية */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  استخدام الأدوية
                </h3>
                <Select value={formData.medicationsUsed} onValueChange={(value) => handleInputChange('medicationsUsed', value)}>
                  <SelectTrigger className="w-48 text-xl">
                    <SelectValue placeholder="اختر..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نعم" className="text-xl arabic-font">نعم</SelectItem>
                    <SelectItem value="لا" className="text-xl arabic-font">لا</SelectItem>
                  </SelectContent>
                </Select>
                
                {formData.medicationsUsed === 'نعم' && (
                  <div className="space-y-4 mt-4">
                    <p className="text-lg arabic-font rtl text-gray-600">اختر الأدوية المستخدمة:</p>
                    {medicationOptions.map((medication) => (
                      <div key={medication} className="flex items-center space-x-2 rtl">
                        <Checkbox
                          id={medication}
                          checked={formData.medications.includes(medication)}
                          onCheckedChange={() => handleCheckboxChange('medications', medication)}
                        />
                        <label htmlFor={medication} className="text-xl arabic-font">
                          {medication}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* دعم بفرقة أخرى */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  دعم بفرقة أخرى
                </h3>
                <Select value={formData.additionalTeamSupport} onValueChange={(value) => handleInputChange('additionalTeamSupport', value)}>
                  <SelectTrigger className="w-48 text-xl">
                    <SelectValue placeholder="اختر..." />
                  </SelectTrigger>
                  <SelectContent>
                    {additionalTeamOptions.map((option) => (
                      <SelectItem key={option} value={option} className="text-xl arabic-font">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* وقت الوصول إلى المستشفى */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  وقت الوصول إلى المستشفى
                </h3>
                <Input
                  type="time"
                  value={formData.hospitalArrivalTime}
                  onChange={(e) => handleInputChange('hospitalArrivalTime', e.target.value)}
                  className="w-48 text-xl"
                />
              </div>

               {/* نهاية جهود الإنعاش */}
<div>
  <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
    نهاية جهود الإنعاش
  </h3>
  <Select
    value={formData.endOfResuscitation}
    onValueChange={(value) => handleInputChange('endOfResuscitation', value)}
  >
    <SelectTrigger className="w-full text-xl">
      <SelectValue placeholder="اختر خياراً" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="رجوع النبض قبل الوصول للمستشفى" className="text-xl arabic-font">
        رجوع النبض قبل الوصول للمستشفى
      </SelectItem>
      <SelectItem value="استكمال الإنعاش داخل قسم الطوارئ  ورجوع النبض" className="text-xl arabic-font">
        استكمال الإنعاش داخل قسم الطوارئ  ورجوع النبض
      </SelectItem>
      <SelectItem value="استكمال الإنعاش داخل قسم الطوارئ وإعلان الوفاة" className="text-xl arabic-font">
        استكمال الإنعاش داخل قسم الطوارئ وإعلان الوفاة
      </SelectItem>
    </SelectContent>
  </Select>

  {formData.endOfResuscitation === 'رجوع النبض قبل الوصول للمستشفى' && (
    <div className="mt-4">
      <label className="text-xl arabic-font rtl mb-2 block">
        توقيت رجوع النبض
      </label>
      <Input
        type="time"
        value={formData.returnOfPulseTime}
        onChange={(e) => handleInputChange('returnOfPulseTime', e.target.value)}
        className="w-48 text-xl"
      />
    </div>
  )}
</div>

              {/* مدة الإنعاش (حساب تلقائي) */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  مدة الإنعاش (حساب تلقائي)
                </h3>
                <Input
                  type="text"
                  value={formData.resuscitationDuration ? `${formData.resuscitationDuration} دقيقة` : ''}
                  readOnly
                  className="w-48 text-xl bg-gray-100"
                  placeholder="يتم الحساب تلقائياً"
                />
                <p className="text-sm text-gray-600 mt-2 arabic-font rtl">
                  يتم حساب المدة تلقائياً من وقت بدء الإنعاش إلى وقت الوصول للمستشفى
                </p>
              </div>

              {/* عدد الدورات الكلي (حساب تلقائي) */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  عدد الدورات الكلي (حساب تلقائي)
                </h3>
                <Input
                  type="text"
                  value={formData.totalCycles}
                  readOnly
                  className="w-48 text-xl bg-gray-100"
                  placeholder="يتم الحساب تلقائياً"
                />
                <p className="text-sm text-gray-600 mt-2 arabic-font rtl">
                  يتم حساب عدد الدورات تلقائياً: كل دقيقتين = 5 دورات
                </p>
              </div>

              {/* ملاحظات إضافية */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  ملاحظات إضافية
                </h3>
                <Textarea
                  placeholder="اكتب أي ملاحظات إضافية هنا..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="arabic-font rtl text-xl"
                  rows={4}
                />
              </div>

              {/* زر إنشاء التقرير */}
              <div className="text-center">
                <Button
                  onClick={generateReport}
                  className="red-crescent-button text-white px-8 py-3 text-2xl arabic-font"
                >
                  إنشاء التقرير
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* عرض التقرير */}
          {generatedReport && (
            <div className="space-y-8">
              {/* التقرير الرئيسي */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl arabic-font rtl">
                    التقرير المُنشأ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* التقرير بالعربية */}
                    <div>
                      <h4 className="text-2xl font-semibold mb-3 arabic-font rtl">
                        التقرير باللغة العربية
                      </h4>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="arabic-font rtl leading-relaxed text-xl">
                          {generatedReport}
                        </p>
                      </div>
                    </div>

                    {/* التقرير بالإنجليزية */}
                    <div>
                      <h4 className="text-2xl font-semibold mb-3">
                        Report in English
                      </h4>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="ltr leading-relaxed text-xl">
                          {translateReport(generatedReport)}
                        </p>
                      </div>
                    </div>

                    {/* أزرار النسخ */}
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={() => navigator.clipboard.writeText(generatedReport)}
                        variant="outline"
                        className="arabic-font text-xl"
                      >
                        نسخ التقرير العربي
                      </Button>
                      <Button
                        onClick={() => navigator.clipboard.writeText(translateReport(generatedReport))}
                        variant="outline"
                        className="text-xl"
                      >
                        Copy English Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* الملخص */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl arabic-font rtl">
                    الملخص
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* الملخص بالعربية */}
                    <div>
                      <h4 className="text-2xl font-semibold mb-3 arabic-font rtl">
                        الملخص باللغة العربية
                      </h4>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <pre className="arabic-font rtl leading-relaxed text-xl whitespace-pre-wrap">
                          {summary}
                        </pre>
                      </div>
                    </div>

                    {/* الملخص بالإنجليزية */}
                    <div>
                      <h4 className="text-2xl font-semibold mb-3">
                        Summary in English
                      </h4>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <pre className="ltr leading-relaxed text-xl whitespace-pre-wrap">
                          {translateSummary(summary)}
                        </pre>
                      </div>
                    </div>

                    {/* أزرار النسخ للملخص */}
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={() => navigator.clipboard.writeText(summary)}
                        variant="outline"
                        className="arabic-font text-xl"
                      >
                        نسخ الملخص العربي
                      </Button>
                      <Button
                        onClick={() => navigator.clipboard.writeText(translateSummary(summary))}
                        variant="outline"
                        className="text-xl"
                      >
                        Copy English Summary
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ResuscitationCase

