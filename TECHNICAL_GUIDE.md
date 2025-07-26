# الدليل التقني المفصل - مساعد التقارير الإسعافية

## نظرة عامة تقنية

مساعد التقارير الإسعافية هو تطبيق ويب أحادي الصفحة (SPA) مبني باستخدام React 18 مع TypeScript/JavaScript. يستخدم التطبيق أحدث تقنيات تطوير الويب لضمان الأداء العالي والتجربة المستخدم المتميزة.

## البنية التقنية

### Frontend Architecture
```
┌─────────────────────────────────────┐
│           React App                 │
├─────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐   │
│  │   Router    │ │   State     │   │
│  │   (React    │ │ Management  │   │
│  │   Router)   │ │  (useState) │   │
│  └─────────────┘ └─────────────┘   │
├─────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐   │
│  │ Components  │ │   Styling   │   │
│  │  (shadcn/ui)│ │ (Tailwind)  │   │
│  └─────────────┘ └─────────────┘   │
├─────────────────────────────────────┤
│           Build Tool (Vite)         │
└─────────────────────────────────────┘
```

### Component Hierarchy
```
App.jsx
├── HomePage
│   └── CaseTypeCards (4x)
├── MedicalCase
│   ├── PageHeader
│   └── FormSections
├── InjuryCase
│   ├── PageHeader
│   └── FormSections
├── ResuscitationCase
│   ├── PageHeader
│   └── FormSections (+ Summary)
└── DeathCase
    ├── PageHeader
    └── FormSections
```

## تفاصيل التنفيذ

### إدارة الحالة (State Management)

يستخدم التطبيق React Hooks لإدارة الحالة المحلية:

```javascript
const [formData, setFormData] = useState({
  patientCondition: [],
  symptomsAndSigns: [],
  symptomsNotes: '',
  // ... باقي الحقول
})
```

### معالجة النماذج (Form Handling)

```javascript
const handleCheckboxChange = (category, value) => {
  setFormData(prev => ({
    ...prev,
    [category]: prev[category].includes(value)
      ? prev[category].filter(item => item !== value)
      : [...prev[category], value]
  }))
}
```

### نظام الترجمة

```javascript
const translateReport = (text) => {
  const translations = {
    'واعي متجاوب': 'conscious and responsive',
    'شبه واعي': 'semi-conscious',
    // ... باقي الترجمات
  }
  
  let translatedText = text
  Object.entries(translations).forEach(([arabic, english]) => {
    translatedText = translatedText.replace(
      new RegExp(arabic, 'g'), 
      english
    )
  })
  
  return translatedText
}
```

## الأمان والأداء

### أمان البيانات
- **لا توجد قاعدة بيانات**: جميع البيانات تُعالج محلياً
- **عدم تخزين البيانات**: لا يتم حفظ أي معلومات مريض
- **HTTPS إجباري**: جميع الاتصالات مشفرة
- **CSP Headers**: حماية من XSS attacks

### تحسين الأداء
- **Code Splitting**: تحميل المكونات عند الحاجة
- **Lazy Loading**: تحميل الصور والموارد تدريجياً
- **Bundle Optimization**: تقليل حجم الملفات
- **CDN**: توزيع المحتوى عالمياً

### إمكانية الوصول (Accessibility)
- **ARIA Labels**: وصف العناصر للقارئات الصوتية
- **Keyboard Navigation**: التنقل بالكيبورد
- **Color Contrast**: تباين ألوان مناسب
- **RTL Support**: دعم الكتابة من اليمين لليسار

## إعدادات التطوير

### متطلبات النظام
```json
{
  "node": ">=18.0.0",
  "npm": ">=8.0.0",
  "memory": ">=4GB",
  "storage": ">=1GB"
}
```

### متغيرات البيئة
```bash
# .env.local
VITE_APP_TITLE="مساعد التقارير الإسعافية"
VITE_API_URL="https://api.example.com"
VITE_ENVIRONMENT="development"
```

### إعدادات Vite
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
})
```

## اختبار التطبيق

### اختبارات الوحدة (Unit Tests)
```javascript
// __tests__/MedicalCase.test.jsx
import { render, screen } from '@testing-library/react'
import MedicalCase from '../components/MedicalCase'

test('renders medical case form', () => {
  render(<MedicalCase />)
  expect(screen.getByText('حالة مرضية')).toBeInTheDocument()
})
```

### اختبارات التكامل (Integration Tests)
```javascript
// __tests__/ReportGeneration.test.jsx
test('generates correct medical report', () => {
  // اختبار إنشاء التقرير الطبي
  const formData = {
    patientCondition: ['واعي متجاوب'],
    symptomsAndSigns: ['ألم في البطن']
  }
  
  const report = generateMedicalReport(formData)
  expect(report).toContain('واعي متجاوب')
  expect(report).toContain('ألم في البطن')
})
```

### اختبارات الأداء
```javascript
// performance.test.js
import { measurePerformance } from './utils/performance'

test('page load time under 3 seconds', async () => {
  const loadTime = await measurePerformance()
  expect(loadTime).toBeLessThan(3000)
})
```

## النشر والتوزيع

### بناء الإنتاج
```bash
# تنظيف الملفات السابقة
rm -rf dist/

# بناء المشروع
npm run build

# فحص البناء
npm run preview
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to server
        run: |
          # نشر الملفات على الخادم
```

## مراقبة الأداء

### مقاييس الأداء الرئيسية
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### أدوات المراقبة
```javascript
// analytics.js
export const trackPageView = (page) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: page,
      page_location: window.location.href
    })
  }
}

export const trackEvent = (action, category) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: window.location.pathname
    })
  }
}
```

## إدارة الأخطاء

### معالجة الأخطاء العامة
```javascript
// ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // إرسال التقرير لخدمة مراقبة الأخطاء
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>حدث خطأ غير متوقع</h2>
          <button onClick={() => window.location.reload()}>
            إعادة تحميل الصفحة
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

### تسجيل الأخطاء
```javascript
// logger.js
export const logError = (error, context = {}) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...context
  }
  
  // إرسال للخادم أو خدمة مراقبة
  console.error('Application Error:', errorData)
}
```

## التحسينات المستقبلية

### المرحلة الثانية
- **قاعدة بيانات محلية**: حفظ المسودات محلياً
- **طباعة مباشرة**: تصدير PDF
- **قوالب مخصصة**: إنشاء قوالب جديدة
- **تزامن البيانات**: مزامنة بين الأجهزة

### المرحلة الثالثة
- **ذكاء اصطناعي**: اقتراحات تلقائية
- **تحليل البيانات**: إحصائيات وتقارير
- **تطبيق موبايل**: نسخة للهواتف الذكية
- **تكامل أنظمة**: ربط مع أنظمة المستشفيات

### تحسينات الأداء
```javascript
// تحسين الذاكرة
const optimizeMemory = () => {
  // تنظيف المتغيرات غير المستخدمة
  if (window.gc) {
    window.gc()
  }
}

// تحسين التحميل
const preloadCriticalResources = () => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = '/assets/logo.jpg'
  link.as = 'image'
  document.head.appendChild(link)
}
```

## الصيانة والتحديث

### جدولة الصيانة
- **يومياً**: فحص الأخطاء والأداء
- **أسبوعياً**: تحديث التبعيات الأمنية
- **شهرياً**: مراجعة الكود وتحسين الأداء
- **ربع سنوياً**: تحديث الإطار والمكتبات الرئيسية

### إجراءات التحديث
```bash
# فحص التحديثات المتاحة
npm outdated

# تحديث التبعيات الآمنة
npm update

# تحديث التبعيات الرئيسية (بحذر)
npm install react@latest react-dom@latest

# اختبار بعد التحديث
npm test
npm run build
```

### النسخ الاحتياطية
```bash
# نسخ احتياطي للكود
git archive --format=tar.gz --output=backup-$(date +%Y%m%d).tar.gz HEAD

# نسخ احتياطي للإعدادات
cp -r config/ backups/config-$(date +%Y%m%d)/
```

## الأمان المتقدم

### حماية من الهجمات
```javascript
// Content Security Policy
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
`

// XSS Protection
const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}
```

### تشفير البيانات الحساسة
```javascript
// تشفير البيانات المحلية (إذا لزم الأمر)
const encryptData = (data, key) => {
  // استخدام مكتبة تشفير آمنة
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}

const decryptData = (encryptedData, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
```

## خاتمة

هذا الدليل التقني يوفر نظرة شاملة على بنية وتنفيذ مساعد التقارير الإسعافية. التطبيق مصمم ليكون قابلاً للصيانة والتطوير مع الحفاظ على أعلى معايير الأمان والأداء.

للمزيد من المعلومات التقنية أو الدعم، يرجى الرجوع إلى الوثائق الرسمية للمكتبات المستخدمة أو التواصل مع فريق التطوير.

