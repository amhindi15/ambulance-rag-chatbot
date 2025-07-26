import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import PageHeader from './PageHeader'

function MedicalCase() {
  const [formData, setFormData] = useState({
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
    'ألم في البطن', 'غثيان', 'استفراغ', 'دوخة', 'كحة', 'تعب عام',
    'ضيق في التنفس', 'تنميل في اليد', 'تنميل في القدم', 'ضعف في الجانب الأيمن',
    'ضعف في الجانب الأيسر', 'حرارة', 'صداع', 'نزيف من المهبل', 'قيء دموي',
    'ألم في القدم', 'ألم في اليد', 'ألم في الظهر', 'ألم في الصدر غير قلبي',
    'ألم في الصدر قلبي', 'ألم في الحوض', 'ألم في الحلق', 'ألم في العين',
    'إغماء', 'ألم عند التبول', 'ألم في الجنب', 'تشنجات متفرقة',
    'تفاعلات تحسسية','خفقان','طفح جلدي', 'حكة', 'صعوبة في التحدث', 'ارتباك ذهني','تشنجات'
  ]

  const clinicalExamOptions = [
    'التنفس طبيعي وفعال', 'تنفس غير طبيعي', 'البطن لين وسليم', 'البطن منتفخة ومتحجرة',
    'أصوات تنفس غير طبيعية', 'الحدقات متوسعة', 'الحدقات ضيقة', 'ضعف في الجهة اليمنى',
    'ضعف في الجهة اليسرى', 'تعرق', 'برودة الأطراف', 'صعوبة في التحدث','غيبوبة سكر',
    'اجهاد حراري','ضربة شمس','نوبة هلع','الفحص العصبي سليم'
  ]

  const vitalSignsOptions = [
    'مستقرة',
    'غير مستقرة'
  ]

  const proceduresOptions = [
    'تم إعطاء أكسجين',
    'تم فتح مجرى وريدي',
    'تم إعطاء جلسة بخار',
    'تم فتح مجرى هواء أنفي',
    'تم فتح مجرى هواء فموي'
  ]

  const transportOptions = [
    'تم نقل الحالة إلى أقرب منشأة صحية لعمل الفحوصات اللازمة',
    'تم نصح المريض بالنقل لعمل الفحوصات اللازمة ورفض النقل ووقع على ذلك وتم التوثيق مع التوجيه الطبي',
    'تم العلاج في الموقع والاكتفاء بالعلاج من قبل الحالة ورفضت النقل وتم التوثيق'
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
  : (formData.patientConditionNotes || '')

    const patientPositionText = formData.patientPosition.length > 0
  ? ' وكان بوضعية ' + formData.patientPosition.join(' و ') + (formData.patientPositionNotes ? ' و ' + formData.patientPositionNotes : '')
  : (formData.patientPositionNotes ? ' وكان بوضعية ' + formData.patientPositionNotes : '')

    
    const symptomsText = formData.symptomsAndSigns.length > 0 
      ? formData.symptomsAndSigns.join(' و ') + (formData.symptomsNotes ? ' و ' + formData.symptomsNotes : '')
      : (formData.symptomsNotes || '')
    
    const clinicalExamText = formData.clinicalExam.length > 0 
      ? formData.clinicalExam.join(' و ') + (formData.clinicalExamNotes ? ' و ' + formData.clinicalExamNotes : '')
      : (formData.clinicalExamNotes || '')
    
    const vitalSignsText = formData.vitalSigns.length > 0 
      ? formData.vitalSigns.join(' و ') + (formData.vitalSignsNotes ? ' و ' + formData.vitalSignsNotes : '')
      : (formData.vitalSignsNotes || '')
    
    const proceduresText = formData.procedures.length > 0 
      ? formData.procedures.join(' و ') + (formData.proceduresNotes ? ' و ' + formData.proceduresNotes : '')
      : (formData.proceduresNotes || '')

    // النموذج: عند وصول الفرقة الإسعافية وجد حالة (الحالة) (حالة المريض عند الوصول) يشكو من (العلامات والأعراض) منذ (الوقت) وعند الكشف وجد (الفحص السريري) والعلامات الحيوية (العلامات الحيوية) وتم تقديم الإجراءات التالية (الإجراءات المقدمة) (النقل)
    const template = `عند وصول الفرقة الإسعافية وجد حالة مرضية ${patientConditionText}${patientPositionText} يشكو من ${symptomsText} منذ ${formData.symptomsDuration} ${formData.symptomsDurationUnit} وعند الكشف وجد ${clinicalExamText} والعلامات الحيوية ${vitalSignsText}  ${proceduresText} ${formData.transport.join(' و ')}${formData.notes ? `\n\nملاحظات إضافية: ${formData.notes}` : ''}`

    setGeneratedReport(template)
  }

  const translateReport = (text) => {
  const translations = {
    // جمل رئيسية
    'عند وصول الفرقة الإسعافية': 'Upon arrival of the ambulance team',
    'وجد حالة مرضية': 'found a medical case',
    'يشكو من': 'complaining of',
    'منذ': 'since',
    'دقيقة': 'minute(s)',
    'ساعة': 'hour(s)',
    'يوم': 'day(s)',
    'أسبوع': 'week(s)',
    'شهر': 'month(s)',
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
    // العبارات المركبة أولاً
    'أصوات تنفس غير طبيعية': 'abnormal breath sounds',

    // الحالة
    'واعي متجاوب': 'alert and responsive',
    'شبه واعي': 'semi-conscious',
    'متهيج': 'agitated',
    'غير واعي': 'unconscious',

    // الأعراض
    'ألم في البطن': 'abdominal pain',
    'غثيان': 'nausea',
    'استفراغ': 'vomiting',
    'دوخة': 'dizziness',
    'كحة': 'cough',
    'تعب عام': 'general fatigue',
    'ضيق في التنفس': 'shortness of breath',
    'تنميل في اليد': 'numbness in hand',
    'تنميل في القدم': 'numbness in foot',
    'ضعف في الجانب الأيمن': 'right-sided weakness',
    'ضعف في الجانب الأيسر': 'left-sided weakness',
    'حرارة': 'fever',
    'صداع': 'headache',
    'نزيف من المهبل': 'vaginal bleeding',
    'قيء دموي': 'hematemesis',
    'ألم في القدم': 'foot pain',
    'ألم في اليد': 'hand pain',
    'ألم في الظهر': 'back pain',
    'ألم في الصدر غير قلبي': 'non-cardiac chest pain',
    'ألم في الصدر قلبي': 'cardiac chest pain',
    'ألم في الحوض': 'pelvic pain',
    'ألم في الحلق': 'throat pain',
    'ألم في العين': 'eye pain',
    'إغماء': 'syncope',
    'ألم عند التبول': 'dysuria',
    'ألم في الجنب': 'flank pain',
    'تشنجات متفرقة': 'intermittent seizures',
    'طفح جلدي': 'skin rash',
    'حكة': 'itching',
    'صعوبة في التحدث': 'difficulty speaking',
    'ارتباك ذهني': 'mental confusion',
    'تشنجات': 'sizures',
    'تفاعلات تحسسية': 'allergic reaction',
    'خفقان': 'palpitation',
    'ضربة شمس': 'sunstroke',
    'اجهاد حراري': 'heat exhaustion',
    'نوبة هلع':'panic attack',

    // الفحص السريري
    'التنفس طبيعي وفعال': 'normal and effective breathing',
    'تنفس غير طبيعي': 'abnormal breathing',
    'البطن لين وسليم': 'soft and normal abdomen',
    'البطن منتفخة ومتحجرة': 'distended and rigid abdomen',
    'الحدقات متوسعة': 'dilated pupils',
    'الحدقات ضيقة': 'constricted pupils',
    'تعرق': 'sweating',
    'برودة الأطراف': 'cold extremities',
    'غيبوبة سكر': 'hypoglycemia',
    'الفحص العصبي سليم':'neurological exam clear',

    // العلامات الحيوية
    'مستقرة': 'stable',
    'غير مستقرة': 'unstable',

    // الإجراءات
    'تم إعطاء أكسجين': 'oxygen administration',
    'تم فتح مجرى وريدي': 'IV access established',
    'تم إعطاء جلسة بخار': 'nebulizer treatment given',
    'تم فتح مجرى هواء أنفي': 'nasal airway insertion',
    'تم فتح مجرى هواء فموي': 'oral airway insertion',

    // النقل
    'تم نقل الحالة إلى أقرب منشأة صحية لعمل الفحوصات اللازمة': 'patient was transported to the nearest healthcare facility for necessary examinations',
    'تم نصح المريض بالنقل لعمل الفحوصات اللازمة ورفض النقل ووقع على ذلك وتم التوثيق مع التوجيه الطبي': 'patient was advised to transport for further investigation but refused transport, signed refusal, and this was documented with medical control',
    'تم العلاج في الموقع والاكتفاء بالعلاج من قبل الحالة ورفضت النقل وتم التوثيق': 'treatment on the scene done , pt was satisfied with the care provided, refused transportation, and contact with medical control done',

    // كلمات ربط
'و ': ' and ',
'في ': ' in '
  }
  

  let translatedText = text.trim()

  Object.entries(translations)
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([arabic, english]) => {
      translatedText = translatedText.split(arabic).join(english)
    })

  return translatedText
}

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="حالة مرضية" 
        titleEn="Medical Case"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* التعليمات الهامة */}
          <Card className="mb-8 border-blue-500 border-2">
            <CardHeader>
              <CardTitle className="text-3xl arabic-font rtl text-blue-600">
                تعليمات هامة
              </CardTitle>
              <CardTitle className="text-2xl text-blue-600">
                Important Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* تعليمات ألم الصدر */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-xl arabic-font rtl font-semibold text-blue-800 mb-2">
                    حالات ألم الصدر:
                  </h4>
                  <p className="text-lg arabic-font rtl text-blue-700">
                    لا تنسى إعطاء أسبرين 300 ملغ، وإذا لا يوجد اكتب 0 في خانة الأدوية مع ذكر السبب
                  </p>
                  <h4 className="text-lg font-semibold text-blue-800 mb-1 mt-3">
                    Chest Pain Cases:
                  </h4>
                  <p className="text-md text-blue-700">
                    Don't forget to administer aspirin 300mg, if not available write 0 in medications field with reason
                  </p>
                </div>

                {/* تعليمات الربو */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-xl arabic-font rtl font-semibold text-green-800 mb-2">
                    حالات الربو:
                  </h4>
                  <p className="text-lg arabic-font rtl text-green-700">
                    لا تنسى إعطاء بخار فينتولين 5 ملغ للكبار و 2.5 للصغار وتسجيلها في الأدوية، وإذا لا يوجد اكتب 0 مع ذكر السبب
                  </p>
                  <h4 className="text-lg font-semibold text-green-800 mb-1 mt-3">
                    Asthma Cases:
                  </h4>
                  <p className="text-md text-green-700">
                    Don't forget to administer nebulized salbutamol (ventolin) 5mg for adults and 2.5mg for children, record in medications. If not available write 0 with reason
                  </p>
                </div>

                {/* تعليمات التشنجات */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-xl arabic-font rtl font-semibold text-purple-800 mb-2">
                    حالات التشنجات المستمرة:
                  </h4>
                  <p className="text-lg arabic-font rtl text-purple-700">
                    إذا كنت فرقة متقدمة لا تنسى إعطاء ميدازولام، وإذا كنت فرقة أساسية غيّر الحالة إلى (تعب عام مثلاً)
                  </p>
                  <h4 className="text-lg font-semibold text-purple-800 mb-1 mt-3">
                    Continuous Seizures:
                  </h4>
                  <p className="text-md text-purple-700">
                    If advanced team, don't forget to administer midazolam. If basic team, change condition to (general fatigue for example)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* نموذج الإدخال */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl arabic-font rtl">
                بيانات الحالة المرضية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* حالة المريض عند الوصول */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  حالة المريض عند الوصول
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                 placeholder="ملاحظات عن حالة المريض..."
                 value={formData.patientConditionNotes}
                 onChange={(e) => handleInputChange('patientConditionNotes', e.target.value)}
                 className="arabic-font rtl text-xl mt-4"
                 rows={3}
                />
              </div>

{/* وضعية المريض */}
<div>
  <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
    وضعية المريض
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      'الجلوس',
      'الوقوف',
      'مستلقي على ظهره',
      'مستلقي على بطنه',
      'مستلقي على الجنب'
    ].map((position) => (
      <div key={position} className="flex items-center space-x-2 rtl">
        <Checkbox
          id={position}
          checked={formData.patientPosition.includes(position)}
          onCheckedChange={() =>
            handleCheckboxChange('patientPosition', position)
          }
        />
        <label htmlFor={position} className="text-xl arabic-font">
          {position}
        </label>
      </div>
    ))}
  </div>

  <Textarea
    placeholder="ملاحظات وضعية المريض..."
    value={formData.patientPositionNotes}
    onChange={(e) =>
      handleInputChange('patientPositionNotes', e.target.value)
    }
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

export default MedicalCase

