import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import PageHeader from './PageHeader'

function InjuryCase() {
  const [formData, setFormData] = useState({
    injuryCause: '',
    patientCondition: [],
    patientConditionNotes: '',
    patientPosition: [],
    patientPositionNotes: '',
    symptomsAndSigns: [],
    symptomsNotes: '',
    symptomsDuration: '',
    symptomsDurationUnit: 'دقيقة',
    clinicalExam: [],
    clinicalExamNotes: '',
    vitalSigns: [],
    vitalSignsNotes: '',
    procedures: [],
    proceduresNotes: '',
    transport: [],
    notes: ''
  })

  const [generatedReport, setGeneratedReport] = useState('')

  // بيانات النموذج بناءً على الملف المرجعي
  const injuryCauses = [
    'سقوط',
    'حادث مروري',
    'حادث دباب',
    'دهس',
    'اعتداء',
    'حروق'
  ]

  const patientConditions = [
    'واعي متجاوب',
    'شبه واعي',
    'متهيج',
    'غير واعي'
  ]

  const patientPositions = [
  'الجلوس',
  'الوقوف',
  'مستلقي على ظهره',
  'مستلقي على بطنه',
  'مستلقي على الجنب'
]

  const symptomsAndSigns = [
    'ألم في البطن', 'غثيان', 'استفراغ', 'دوخة', 'ضيق في التنفس',
    'تنميل في اليد', 'تنميل في القدم', 'ضعف في الجانب الأيمن', 'ضعف في الجانب الأيسر',
    'صداع', 'قيء دموي', 'ألم في القدم', 'ألم في اليد', 'ألم في الظهر',
    'ألم في الرقبة', 'ألم في الصدر غير قلبي', 'ألم في الحوض', 'ألم في العين',
    'إغماء شبه واعي', 'صعوبة في التحدث', 'ارتباك ذهني', 'إصابة في الصدر',
    'إصابة في البطن', 'إصابة في اليد', 'إصابة في القدم', 'إصابة في الظهر',
    'إصابة في الحوض', 'إصابة أسفل الظهر', 'إصابة في الأطراف العلوية',
    'إصابة في الأطراف السفلية', 'إصابة في الرأس','إصابة في الصدر'
  ]

  const clinicalExamOptions = [
    'التنفس طبيعي وفعال', 'تنفس غير طبيعي', 'إصابة في الرأس', 'البطن لين وسليم',
    'البطن منتفخة ومتحجرة', 'أصوات تنفس غير طبيعية', 'الحدقات متوسعة', 'الحدقات ضيقة',
    'ضعف في الجهة اليمنى', 'ضعف في الجهة اليسرى', 'كسر في اليد', 'كسر في القدم',
    'كسر في الفخذ', 'تشوه في اليد', 'تشوه في القدم', 'نزيف حاد',
    'فقد الإحساس والحركة', 'غياب النبض في الأطراف العلوية', 'غياب النبض في الأطراف السفلية','إصابة في الصدر',
    'تشوه في الوجه','إصابة في الوجه'
  ]

  const vitalSignsOptions = [
    'مستقرة',
    'غير مستقرة'
  ]

  const proceduresOptions = [
    'تم إعطاء أكسجين',
    'فتح مجرى وريدي وإعطاء محاليل',
    'فتح مجرى هواء أنفي',
    'تم تثبيت المصاب',
    'فتح مجرى هواء فموي',
    'تضميد الجروح',
    'إيقاف النزيف'
  ]

  const transportOptions = [
    'تم نقل الحالة إلى أقرب منشأة صحية لعمل الفحوصات اللازمة',
    'تم نصح المريض بالنقل لعمل الفحوصات اللازمة ورفض النقل ووقع على ذلك وتم التوثيق مع التوجيه الطبي'
  ]

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
    // بناء النموذج بناءً على النمط المطلوب
    const patientConditionText = formData.patientCondition.length > 0 
      ? formData.patientCondition.join(' و ') + (formData.patientConditionNotes ? ' و ' + formData.patientConditionNotes : '')
      : ''

    const patientPositionText = formData.patientPosition.length > 0
      ? ' وكان بوضعية ' + formData.patientPosition.join(' و ') + (formData.patientPositionNotes ? ' و ' + formData.patientPositionNotes : '')
      : (formData.patientPositionNotes ? ' وكان بوضعية ' + formData.patientPositionNotes : '')

    const symptomsText = formData.symptomsAndSigns.length > 0 
      ? formData.symptomsAndSigns.join(' و ') + (formData.symptomsNotes ? ' و ' + formData.symptomsNotes : '')
      : ''
    
    const clinicalExamText = formData.clinicalExam.length > 0 
      ? formData.clinicalExam.join(' و ') + (formData.clinicalExamNotes ? ' و ' + formData.clinicalExamNotes : '')
      : ''
    
    const vitalSignsText = formData.vitalSigns.length > 0 
      ? formData.vitalSigns.join(' و ') + (formData.vitalSignsNotes ? ' و ' + formData.vitalSignsNotes : '')
      : ''
    
    const proceduresText = formData.procedures.length > 0 
      ? formData.procedures.join(' و ') + (formData.proceduresNotes ? ' و ' + formData.proceduresNotes : '')
      : ''

    const template = `عند وصول الفرقة الإسعافية وجد حالة إصابة ${patientConditionText}${patientPositionText} يشكو من ${symptomsText} منذ ${formData.symptomsDuration} ${formData.symptomsDurationUnit} نتيجة ${formData.injuryCause} وعند الكشف وجد ${clinicalExamText} والعلامات الحيوية ${vitalSignsText} وتم تقديم الإجراءات التالية ${proceduresText} ${formData.transport.join(' و ')}${formData.notes ? `\n\nملاحظات إضافية: ${formData.notes}` : ''}`

    setGeneratedReport(template)
  }

  const translateReport = (text) => {
    const translations = {
      'عند وصول الفرقة الإسعافية': 'Upon arrival of the ambulance team',
      'وجد حالة إصابة': 'found an injury case',
      'يشكو من': 'complaining of',
      'منذ': 'since',
      'دقيقة': 'minute(s)',
      'ساعة': 'hour(s)',
      'يوم': 'day(s)',
      'أسبوع': 'week(s)',
      'شهر': 'month(s)',
      'نتيجة': 'due to',
      'وعند الكشف وجد': 'and upon examination found',
      'والعلامات الحيوية': 'and vital signs',
      'وتم تقديم الإجراءات التالية': 'and the following procedures were performed',
      'ملاحظات إضافية:': 'Additional notes:',
      'وكان بوضعية': 'and was in the position of',
      'الجلوس': 'sitting',
      'الوقوف': 'standing',
      'مستلقي على ظهره': 'lying supine',
      'مستلقي على بطنه': 'lying prone',
      'مستلقي على الجنب': 'lying on the side',

      
      // أسباب الإصابة
      'سقوط': 'fall',
      'حادث مروري': 'motor vehicle accident',
      'حادث دباب': 'motorcycle accident',
      'دهس': 'pedestrian struck',
      'اعتداء': 'assault',
      'حروق': 'burn',
      
      // حالة المريض
      'واعي متجاوب': 'alert and responsive',
      'شبه واعي': 'semi-conscious',
      'متهيج': 'agitated',
      'غير واعي': 'unconscious',
      
      // الأعراض والعلامات
      'ألم في البطن': 'abdominal pain',
      'غثيان': 'nausea',
      'استفراغ': 'vomiting',
      'دوخة': 'dizziness',
      'ضيق في التنفس': 'shortness of breath',
      'تنميل في اليد': 'numbness in hand',
      'تنميل في القدم': 'numbness in foot',
      'ضعف في الجانب الأيمن': 'right-sided weakness',
      'ضعف في الجانب الأيسر': 'left-sided weakness',
      'صداع': 'headache',
      'قيء دموي': 'hematemesis',
      'ألم في القدم': 'foot pain',
      'ألم في اليد': 'hand pain',
      'ألم في الظهر': 'back pain',
      'ألم في الرقبة': 'neck pain',
      'ألم في الصدر غير قلبي': 'non-cardiac chest pain',
      'ألم في الحوض': 'pelvic pain',
      'ألم في العين': 'eye pain',
      'إغماء شبه واعي': 'near syncope',
      'صعوبة في التحدث': 'difficulty speaking',
      'ارتباك ذهني': 'mental confusion',
      'إصابة في الصدر': 'chest trauma',
      'إصابة في البطن': 'abdominal trauma',
      'إصابة في اليد': 'hand injury',
      'إصابة في الرجل': 'foot injury',
      'إصابة في الظهر': 'back injury',
      'إصابة في الحوض': 'pelvic injury',
      'إصابة أسفل الظهر': 'lower back injury',
      'إصابة في الأطراف العلوية': 'upper extremity injury',
      'إصابة في الأطراف السفلية': 'lower extremity injury',
      'إصابة في الرأس': 'head injury',
      'إصابة في الوجه':'face trauma',
      'تشوه في الوجه':'face deformity',
      
      // الفحص السريري
      'التنفس طبيعي وفعال': 'normal and effective breathing',
      'تنفس غير طبيعي': 'abnormal breathing',
      'البطن لين وسليم': 'soft and lax abdomen',
      'البطن منتفخة ومتحجرة': 'distended and rigid abdomen',
      'أصوات تنفس غير طبيعية': 'abnormal breath sounds',
      'الحدقات متوسعة': 'dilated pupils',
      'الحدقات ضيقة': 'constricted pupils',
      'ضعف في الجهة اليمنى': 'right-sided weakness',
      'ضعف في الجهة اليسرى': 'left-sided weakness',
      'كسر في اليدين': 'hand fracture',
      'كسر في الرجلين': 'leg fracture',
      'كسر في الفخذ': 'femur fracture',
      'تشوه في اليد': 'hand deformity',
      'تشوه في القدم': 'foot deformity',
      'نزيف حاد': 'severe bleeding',
      'فقد الإحساس والحركة': 'loss of sensation and movement',
      'غياب النبض في الأطراف العلوية': 'absent pulse in upper extremities',
      'غياب النبض في الأطراف السفلية': 'absent pulse in lower extremities',
      
      // العلامات الحيوية
      'مستقرة': 'stable',
      'غير مستقرة': 'unstable',
      
      // الإجراءات
      'تم إعطاء أكسجين': 'oxygen administration',
      ' فتح مجرى وريدي وإعطاء محاليل': 'IV access established and fluid given',
      'فتح مجرى هواء أنفي': 'nasal airway insertion',
      'تم تثبيت المصاب بالكامل': 'full patient immobilization',
      'فتح مجرى هواء فموي': 'oral airway insertion',
      'تضميد الجروح': 'wound dressing',
      'إيقاف النزيف': 'bleeding control',
      
      // النقل
      'تم نقل الحالة إلى أقرب منشأة صحية لعمل الفحوصات اللازمة': 'patient was transported to the nearest healthcare facility for necessary examinations',
      'تم نصح المريض بالنقل لعمل الفحوصات اللازمة ورفض النقل ووقع على ذلك وتم التوثيق مع التوجيه الطبي': 'patient was advised to transport for necessary examinations but refused transport, signed refusal, and this was documented with medical direction',
      
      // كلمات ربط
      'و ': ' and ',
      'في ': ' in '
    }

    let translatedText = text
    Object.entries(translations).forEach(([arabic, english]) => {
      translatedText = translatedText.replace(new RegExp(arabic, 'g'), english)
    })

    return translatedText
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="حالة إصابة" 
        titleEn="Injury Case"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* نموذج الإدخال */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl arabic-font rtl">
                بيانات حالة الإصابة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* سبب الإصابة */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  نتيجة (سبب الإصابة)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {injuryCauses.map((cause) => (
                    <div key={cause} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={cause}
                        checked={formData.injuryCause === cause}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('injuryCause', cause)
                          } else {
                            handleInputChange('injuryCause', '')
                          }
                        }}
                      />
                      <label htmlFor={cause} className="text-xl arabic-font">
                        {cause}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* حالة المصاب عند الوصول */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  حالة المصاب عند الوصول
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {patientConditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={condition}
                        checked={formData.patientCondition.includes(condition)}
                        onCheckedChange={() => handleCheckboxChange('patientCondition', condition)}
                      />
                      <label htmlFor={condition} className="text-xl arabic-font">
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
                <Textarea
                  placeholder="ملاحظات حالة المصاب..."
                  value={formData.patientConditionNotes}
                  onChange={(e) => handleInputChange('patientConditionNotes', e.target.value)}
                  className="arabic-font rtl text-xl"
                  rows={3}
                />
              </div>

              {/* وضعية المريض */}
<div>
  <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">وضعية المريض</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {patientPositions.map((position) => (
      <div key={position} className="flex items-center space-x-2 rtl">
        <Checkbox
          id={position}
          checked={formData.patientPosition.includes(position)}
          onCheckedChange={() => {
            setFormData(prev => ({
              ...prev,
              patientPosition: prev.patientPosition.includes(position)
                ? prev.patientPosition.filter(p => p !== position)
                : [...prev.patientPosition, position]
            }))
          }}
        />
        <label htmlFor={position} className="text-xl arabic-font">{position}</label>
      </div>
    ))}
  </div>

  <Textarea
    placeholder="ملاحظات وضعية المريض..."
    value={formData.patientPositionNotes}
    onChange={(e) => setFormData(prev => ({ ...prev, patientPositionNotes: e.target.value }))}
    className="arabic-font rtl text-xl mt-4"
    rows={3}
  />
</div>

              {/* العلامات والأعراض */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  العلامات والأعراض
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {symptomsAndSigns.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={symptom}
                        checked={formData.symptomsAndSigns.includes(symptom)}
                        onCheckedChange={() => handleCheckboxChange('symptomsAndSigns', symptom)}
                      />
                      <label htmlFor={symptom} className="text-xl arabic-font">
                        {symptom}
                      </label>
                    </div>
                  ))}
                </div>
                <Textarea
                  placeholder="ملاحظات العلامات والأعراض..."
                  value={formData.symptomsNotes}
                  onChange={(e) => handleInputChange('symptomsNotes', e.target.value)}
                  className="arabic-font rtl text-xl"
                  rows={3}
                />
              </div>

              {/* بداية الأعراض */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  بداية الأعراض
                </h3>
                <div className="flex gap-4 items-center">
                  <Input
                    type="number"
                    placeholder="المدة"
                    value={formData.symptomsDuration}
                    onChange={(e) => handleInputChange('symptomsDuration', e.target.value)}
                    className="w-32 text-xl"
                  />
                  <Select value={formData.symptomsDurationUnit} onValueChange={(value) => handleInputChange('symptomsDurationUnit', value)}>
                    <SelectTrigger className="w-32 text-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="دقيقة">دقيقة</SelectItem>
                      <SelectItem value="ساعة">ساعة</SelectItem>
                      <SelectItem value="يوم">يوم</SelectItem>
                      <SelectItem value="أسبوع">أسبوع</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* الفحص السريري */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  الفحص السريري
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {clinicalExamOptions.map((exam) => (
                    <div key={exam} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={exam}
                        checked={formData.clinicalExam.includes(exam)}
                        onCheckedChange={() => handleCheckboxChange('clinicalExam', exam)}
                      />
                      <label htmlFor={exam} className="text-xl arabic-font">
                        {exam}
                      </label>
                    </div>
                  ))}
                </div>
                <Textarea
                  placeholder="ملاحظات الفحص السريري..."
                  value={formData.clinicalExamNotes}
                  onChange={(e) => handleInputChange('clinicalExamNotes', e.target.value)}
                  className="arabic-font rtl text-xl"
                  rows={3}
                />
              </div>

              {/* العلامات الحيوية */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  العلامات الحيوية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {vitalSignsOptions.map((vital) => (
                    <div key={vital} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={vital}
                        checked={formData.vitalSigns.includes(vital)}
                        onCheckedChange={() => handleCheckboxChange('vitalSigns', vital)}
                      />
                      <label htmlFor={vital} className="text-xl arabic-font">
                        {vital}
                      </label>
                    </div>
                  ))}
                </div>
                <Textarea
                  placeholder="ملاحظات العلامات الحيوية..."
                  value={formData.vitalSignsNotes}
                  onChange={(e) => handleInputChange('vitalSignsNotes', e.target.value)}
                  className="arabic-font rtl text-xl"
                  rows={3}
                />
              </div>

              {/* الإجراءات المقدمة */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  الإجراءات المقدمة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {proceduresOptions.map((procedure) => (
                    <div key={procedure} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={procedure}
                        checked={formData.procedures.includes(procedure)}
                        onCheckedChange={() => handleCheckboxChange('procedures', procedure)}
                      />
                      <label htmlFor={procedure} className="text-xl arabic-font">
                        {procedure}
                      </label>
                    </div>
                  ))}
                </div>
                <Textarea
                  placeholder="ملاحظات الإجراءات المقدمة..."
                  value={formData.proceduresNotes}
                  onChange={(e) => handleInputChange('proceduresNotes', e.target.value)}
                  className="arabic-font rtl text-xl"
                  rows={3}
                />
              </div>

              {/* النقل */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  النقل
                </h3>
                <div className="space-y-4">
                  {transportOptions.map((transport) => (
                    <div key={transport} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={transport}
                        checked={formData.transport.includes(transport)}
                        onCheckedChange={() => handleCheckboxChange('transport', transport)}
                      />
                      <label htmlFor={transport} className="text-xl arabic-font">
                        {transport}
                      </label>
                    </div>
                  ))}
                </div>
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
          )}
        </div>
      </main>
    </div>
  )
}

export default InjuryCase

