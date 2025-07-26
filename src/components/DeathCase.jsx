import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Input } from '@/components/ui/input.jsx'
import PageHeader from './PageHeader'

function DeathCase() {
  const [formData, setFormData] = useState({
    arrivalTime: '',
    patientPosition: [],
    clinicalExam: [],
    notes: ''
  })

  const [generatedReport, setGeneratedReport] = useState('')

  // بيانات النموذج
  const positionOptions = [
    'الجلوس',
    'مستلقي على الظهر',
    'مستلقي على البطن'
  ]

  const clinicalExamOptions = [
    'زرقة رمية',
    'زرقة رمية أسفل الظهر',
    'زرقة رمية في الأطراف',
    'زرقة رمية في البطن',
    'تيبس رمي',
    'غياب أصوات القلب عن طريق السماعة',
    'تهشم في الجمجمة',
    'انعدام منعكس التقيؤ',
    'توسع في الحدقات',
    'تحلل الأنسجة',
    'انفصال الرأس عن الجسد'
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
    const template = `عند وصول الفرقة الإسعافية في تمام الساعة ${formData.arrivalTime} وجدت الحالة في إغماء تام بدون نبض وتنفس في وضعية ${formData.patientPosition.join(' و ')} وعند فحص الحالة وجد ${formData.clinicalExam.join(' و ')}${formData.notes ? ' و ' + formData.notes : ''} وعليه تم التواصل مع التوجيه الطبي وإعلان الوفاة في الموقع`

    setGeneratedReport(template)
  }

  const translateReport = (text) => {
  const translations = {
    // الجمل الرئيسية
    'عند وصول الفرقة الإسعافية في تمام الساعة': 'Upon arrival of the ambulance team at',
    'وجدت الحالة في إغماء تام بدون نبض وتنفس في وضعية': 'found the patient unconscious without pulse and breathing in position',
    'وعند فحص الحالة وجد': 'and upon examination found',
    'وعليه تم التواصل مع التوجيه الطبي وإعلان الوفاة في الموقع': 'therefore medical control was contacted and death was pronounced on scene',

    // المواضع
    'مستلقي على الظهر': 'supine',
    'مستلقي على البطن': 'prone',
    'الجلوس': 'sitting',

    // العلامات السريرية (الأطول أولاً)
    'زرقة رمية أسفل الظهر': 'livor mortis in lower back',
    'زرقة رمية في الأطراف': 'livor mortis in extremities',
    'زرقة رمية في البطن': 'livor mortis in abdomen',
    'زرقة رمية': 'livor mortis',
    'تيبس رمي': 'rigor mortis',
    'غياب أصوات القلب عن طريق السماعة': 'absence of heart sounds by stethoscope',
    'تهشم في الجمجمة': 'skull fracture',
    'انعدام منعكس التقيؤ': 'absence of gag reflex',
    'توسع في الحدقات': 'dilated pupils',
    'تحلل الأنسجة': 'tissue decomposition',
    'انفصال الرأس عن الجسد': 'separation of the head from the body',

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
        title="حالة وفاة" 
        titleEn="Death Case"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* نموذج الإدخال */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl arabic-font rtl">
                بيانات حالة الوفاة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* وقت الوصول */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  وقت وصول الفرقة الإسعافية
                </h3>
                <Input
                  type="time"
                  value={formData.arrivalTime}
                  onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
                  className="w-48 text-xl"
                />
              </div>

              {/* وضعية المريض */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  وضعية المريض
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {positionOptions.map((position) => (
                    <div key={position} className="flex items-center space-x-2 rtl">
                      <Checkbox
                        id={position}
                        checked={formData.patientPosition.includes(position)}
                        onCheckedChange={() => handleCheckboxChange('patientPosition', position)}
                      />
                      <label htmlFor={position} className="text-xl arabic-font">
                        {position}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* الفحص السريري */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 arabic-font rtl">
                  الفحص السريري
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              </div>

              {/* ملاحظات */}
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

export default DeathCase

