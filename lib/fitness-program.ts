// 12-week fat-loss program, built from the 11 Sep 2026 InBody (ACCUNIQ BC380).
// Start: 120.1 kg / 37.7% PBF / 41.7 kg SMM. Realistic week-12 landing: ~106 kg.
// The 96 kg goal sits at month 5-6 — see PHASES.note.

export type Exercise = { name: string; nameAr: string; sets: string }
export type Session = {
  id: string
  title: string
  titleAr: string
  day: string
  dayAr: string
  exercises: Exercise[]
}
export type Phase = {
  id: string
  weeks: string
  weeksAr: string
  name: string
  nameAr: string
  intent: string
  intentAr: string
  effort: string
  effortAr: string
  cardio: string
  cardioAr: string
  sessions: Session[]
}

const push = (sets: [string, string, string][]): Exercise[] =>
  sets.map(([name, nameAr, s]) => ({ name, nameAr, sets: s }))

export const PHASES: Phase[] = [
  {
    id: 'p1',
    weeks: 'Weeks 1–4',
    weeksAr: 'الأسابيع ١–٤',
    name: 'Rebuild the foundation',
    nameAr: 'إعادة بناء الأساس',
    intent:
      '14 months off means your tendons are behind your muscles. Every set stops 3–4 reps short of failure. It will feel too easy — that is the point.',
    intentAr:
      'بعد ١٤ شهراً من التوقف، أوتارك متأخرة عن عضلاتك. أنهِ كل مجموعة قبل الفشل بـ٣–٤ تكرارات. ستشعر أنه سهل جداً — وهذا هو المقصود.',
    effort: '3–4 reps in reserve · 2 min rest',
    effortAr: '٣–٤ تكرارات احتياط · راحة دقيقتان',
    cardio: '15 min incline walk after every lift (5 km/h, 8–10% incline)',
    cardioAr: 'مشي مائل ١٥ دقيقة بعد كل تمرين (٥ كم/س، ميل ٨–١٠٪)',
    sessions: [
      {
        id: 'p1-ua',
        day: 'Sat',
        dayAr: 'السبت',
        title: 'Upper A — Push',
        titleAr: 'الجزء العلوي أ — دفع',
        exercises: push([
          ['Machine chest press', 'جهاز ضغط الصدر', '3 × 12'],
          ['Seated dumbbell shoulder press', 'ضغط أكتاف بالدمبل جلوس', '3 × 12'],
          ['Chest-supported dumbbell row', 'تجديف دمبل بإسناد الصدر', '3 × 12'],
          ['Lat pulldown', 'سحب أمامي', '3 × 12'],
          ['Cable triceps pushdown', 'تراي سبس كيبل', '2 × 15'],
          ['Dumbbell lateral raise', 'رفرفة جانبي دمبل', '2 × 15'],
          ['Plank', 'بلانك', '3 × 30 sec'],
        ]),
      },
      {
        id: 'p1-la',
        day: 'Mon',
        dayAr: 'الاثنين',
        title: 'Lower A',
        titleAr: 'الجزء السفلي أ',
        exercises: push([
          ['Leg press', 'ضغط الأرجل', '3 × 12'],
          ['Goblet squat (light)', 'سكوات جوبلت (خفيف)', '3 × 10'],
          ['Leg curl', 'ثني الساق', '3 × 12'],
          ['Dumbbell Romanian deadlift', 'رفعة رومانية بالدمبل', '3 × 10'],
          ['Standing calf raise', 'رفع السمانة وقوف', '3 × 15'],
          ['Dead bug', 'ديد بق', '3 × 10/side'],
        ]),
      },
      {
        id: 'p1-ub',
        day: 'Wed',
        dayAr: 'الأربعاء',
        title: 'Upper B — Pull',
        titleAr: 'الجزء العلوي ب — سحب',
        exercises: push([
          ['Lat pulldown (wide grip)', 'سحب أمامي قبضة واسعة', '3 × 12'],
          ['Seated cable row', 'تجديف كيبل جلوس', '3 × 12'],
          ['Incline dumbbell press', 'ضغط دمبل مائل', '3 × 12'],
          ['Cable face pull', 'فيس بُل كيبل', '3 × 15'],
          ['Dumbbell hammer curl', 'مطرقة بالدمبل', '2 × 12'],
          ['Overhead triceps extension', 'تمديد تراي سبس فوق الرأس', '2 × 12'],
          ['Side plank', 'بلانك جانبي', '3 × 20 sec/side'],
        ]),
      },
      {
        id: 'p1-lb',
        day: 'Thu',
        dayAr: 'الخميس',
        title: 'Lower B',
        titleAr: 'الجزء السفلي ب',
        exercises: push([
          ['Hack squat / machine squat', 'هاك سكوات', '3 × 12'],
          ['Dumbbell walking lunge', 'لنجز مشي بالدمبل', '3 × 10/leg'],
          ['Leg extension', 'تمديد الساق', '3 × 15'],
          ['Hip thrust', 'هيب ثرست', '3 × 12'],
          ['Seated calf raise', 'رفع السمانة جلوس', '3 × 15'],
          ['Cable woodchop', 'ود تشوب كيبل', '3 × 12/side'],
        ]),
      },
    ],
  },
  {
    id: 'p2',
    weeks: 'Weeks 5–8',
    weeksAr: 'الأسابيع ٥–٨',
    name: 'Build intensity',
    nameAr: 'رفع الشدة',
    intent:
      'Same split, heavier. Add weight whenever you hit the top of the range on every set. Week 7 is a deload — same exercises, half the sets, same weight. Do not skip it.',
    intentAr:
      'نفس التقسيم بأوزان أثقل. زد الوزن كلما أنهيت أعلى عدد تكرارات في كل المجموعات. الأسبوع ٧ تخفيف — نفس التمارين، نصف المجموعات، نفس الوزن. لا تتخطاه.',
    effort: '1–2 reps in reserve · main lifts 4 × 8–10',
    effortAr: 'تكرار أو اثنان احتياط · التمارين الأساسية ٤ × ٨–١٠',
    cardio: '20 min post-lift + one 60 min weekend walk or bike',
    cardioAr: 'كارديو ٢٠ دقيقة بعد التمرين + مشي أو دراجة ٦٠ دقيقة في العطلة',
    sessions: [
      {
        id: 'p2-ua',
        day: 'Sat',
        dayAr: 'السبت',
        title: 'Upper A — Push',
        titleAr: 'الجزء العلوي أ — دفع',
        exercises: push([
          ['Machine chest press', 'جهاز ضغط الصدر', '4 × 8–10'],
          ['Seated dumbbell shoulder press', 'ضغط أكتاف بالدمبل جلوس', '4 × 8–10'],
          ['Chest-supported dumbbell row', 'تجديف دمبل بإسناد الصدر', '3 × 10'],
          ['Incline dumbbell fly', 'رفرفة دمبل مائل', '2 × 12'],
          ['Cable triceps pushdown', 'تراي سبس كيبل', '3 × 12'],
          ['Dumbbell lateral raise', 'رفرفة جانبي دمبل', '3 × 15'],
          ['Plank', 'بلانك', '3 × 45 sec'],
        ]),
      },
      {
        id: 'p2-la',
        day: 'Mon',
        dayAr: 'الاثنين',
        title: 'Lower A',
        titleAr: 'الجزء السفلي أ',
        exercises: push([
          ['Leg press', 'ضغط الأرجل', '4 × 8–10'],
          ['Front squat / safety-bar squat', 'سكوات أمامي', '4 × 8'],
          ['Leg curl', 'ثني الساق', '3 × 12'],
          ['Trap bar deadlift', 'رفعة تراب بار', '3 × 8'],
          ['Standing calf raise', 'رفع السمانة وقوف', '3 × 15'],
          ['Dead bug', 'ديد بق', '3 × 12/side'],
        ]),
      },
      {
        id: 'p2-ub',
        day: 'Wed',
        dayAr: 'الأربعاء',
        title: 'Upper B — Pull',
        titleAr: 'الجزء العلوي ب — سحب',
        exercises: push([
          ['Lat pulldown (wide grip)', 'سحب أمامي قبضة واسعة', '4 × 8–10'],
          ['Seated cable row', 'تجديف كيبل جلوس', '4 × 8–10'],
          ['Incline dumbbell press', 'ضغط دمبل مائل', '3 × 10'],
          ['Cable pullover', 'بُل أوفر كيبل', '2 × 12'],
          ['Cable face pull', 'فيس بُل كيبل', '3 × 15'],
          ['Dumbbell hammer curl', 'مطرقة بالدمبل', '3 × 12'],
          ['Side plank', 'بلانك جانبي', '3 × 30 sec/side'],
        ]),
      },
      {
        id: 'p2-lb',
        day: 'Thu',
        dayAr: 'الخميس',
        title: 'Lower B',
        titleAr: 'الجزء السفلي ب',
        exercises: push([
          ['Hack squat / machine squat', 'هاك سكوات', '4 × 8–10'],
          ['Dumbbell walking lunge', 'لنجز مشي بالدمبل', '3 × 12/leg'],
          ['Leg extension', 'تمديد الساق', '3 × 15'],
          ['Hip thrust', 'هيب ثرست', '4 × 10'],
          ['Seated calf raise', 'رفع السمانة جلوس', '3 × 15'],
          ['Cable woodchop', 'ود تشوب كيبل', '3 × 12/side'],
        ]),
      },
    ],
  },
  {
    id: 'p3',
    weeks: 'Weeks 9–12',
    weeksAr: 'الأسابيع ٩–١٢',
    name: 'Push hard, finish strong',
    nameAr: 'الدفع الأخير',
    intent:
      'Last set of each lift goes to failure. Barbell squats and conventional deadlifts come back from week 10 — start light and build over three weeks.',
    intentAr:
      'المجموعة الأخيرة من كل تمرين حتى الفشل. السكوات بالبار والرفعة الميتة تعود من الأسبوع ١٠ — ابدأ خفيفاً وتدرّج على مدى ثلاثة أسابيع.',
    effort: 'Last set to failure · 90 sec rest on isolation',
    effortAr: 'المجموعة الأخيرة حتى الفشل · راحة ٩٠ ثانية للتمارين العازلة',
    cardio: '25 min post-lift + one 20 min bike interval session weekly',
    cardioAr: 'كارديو ٢٥ دقيقة بعد التمرين + جلسة دراجة متقطعة ٢٠ دقيقة أسبوعياً',
    sessions: [
      {
        id: 'p3-ua',
        day: 'Sat',
        dayAr: 'السبت',
        title: 'Upper A — Push',
        titleAr: 'الجزء العلوي أ — دفع',
        exercises: push([
          ['Machine chest press', 'جهاز ضغط الصدر', '4 × 6–10'],
          ['Seated dumbbell shoulder press', 'ضغط أكتاف بالدمبل جلوس', '4 × 6–10'],
          ['Chest-supported dumbbell row', 'تجديف دمبل بإسناد الصدر', '3 × 10'],
          ['Incline dumbbell fly', 'رفرفة دمبل مائل', '3 × 12'],
          ['Cable triceps pushdown + drop set', 'تراي سبس كيبل + دروب ست', '3 × 12'],
          ['Dumbbell lateral raise + drop set', 'رفرفة جانبي + دروب ست', '3 × 15'],
          ['Weighted plank', 'بلانك بوزن', '3 × 45 sec'],
        ]),
      },
      {
        id: 'p3-la',
        day: 'Mon',
        dayAr: 'الاثنين',
        title: 'Lower A',
        titleAr: 'الجزء السفلي أ',
        exercises: push([
          ['Barbell back squat (from wk 10)', 'سكوات خلفي بالبار (من الأسبوع ١٠)', '4 × 6–8'],
          ['Leg press', 'ضغط الأرجل', '4 × 8–10'],
          ['Leg curl + drop set', 'ثني الساق + دروب ست', '3 × 12'],
          ['Trap bar deadlift', 'رفعة تراب بار', '4 × 6'],
          ['Standing calf raise', 'رفع السمانة وقوف', '4 × 15'],
          ['Hanging knee raise', 'رفع الركبتين تعليق', '3 × 12'],
        ]),
      },
      {
        id: 'p3-ub',
        day: 'Wed',
        dayAr: 'الأربعاء',
        title: 'Upper B — Pull',
        titleAr: 'الجزء العلوي ب — سحب',
        exercises: push([
          ['Assisted pull-up', 'عقلة بمساعدة', '4 × 6–10'],
          ['Seated cable row', 'تجديف كيبل جلوس', '4 × 8–10'],
          ['Incline dumbbell press', 'ضغط دمبل مائل', '4 × 8–10'],
          ['Cable pullover', 'بُل أوفر كيبل', '3 × 12'],
          ['Cable face pull', 'فيس بُل كيبل', '3 × 15'],
          ['Hammer curl + drop set', 'مطرقة + دروب ست', '3 × 12'],
          ['Side plank', 'بلانك جانبي', '3 × 40 sec/side'],
        ]),
      },
      {
        id: 'p3-lb',
        day: 'Thu',
        dayAr: 'الخميس',
        title: 'Lower B',
        titleAr: 'الجزء السفلي ب',
        exercises: push([
          ['Conventional deadlift (from wk 10)', 'رفعة ميتة (من الأسبوع ١٠)', '3 × 5'],
          ['Hack squat / machine squat', 'هاك سكوات', '4 × 8–10'],
          ['Dumbbell walking lunge', 'لنجز مشي بالدمبل', '3 × 12/leg'],
          ['Leg extension + drop set', 'تمديد الساق + دروب ست', '3 × 15'],
          ['Hip thrust', 'هيب ثرست', '4 × 10'],
          ['Seated calf raise', 'رفع السمانة جلوس', '4 × 15'],
        ]),
      },
    ],
  },
]

export const MACROS = [
  { key: 'kcal', en: 'Calories', ar: 'السعرات', value: '2,100', unit: 'kcal/day', unitAr: 'سعرة/يوم' },
  { key: 'protein', en: 'Protein', ar: 'البروتين', value: '190', unit: 'g/day', unitAr: 'غرام/يوم' },
  { key: 'carbs', en: 'Carbs', ar: 'الكربوهيدرات', value: '190', unit: 'g/day', unitAr: 'غرام/يوم' },
  { key: 'fat', en: 'Fat', ar: 'الدهون', value: '65', unit: 'g/day', unitAr: 'غرام/يوم' },
  { key: 'fiber', en: 'Fiber', ar: 'الألياف', value: '35+', unit: 'g/day', unitAr: 'غرام/يوم' },
  { key: 'water', en: 'Water', ar: 'الماء', value: '3.5–4', unit: 'L/day', unitAr: 'لتر/يوم' },
]

export const DAILY_HABITS = [
  { id: 'log', en: 'Logged every bite (weighed, not guessed)', ar: 'سجّلت كل ما أكلت (بالوزن لا بالتخمين)' },
  { id: 'protein', en: 'Hit 190 g protein', ar: 'وصلت ١٩٠ غرام بروتين' },
  { id: 'steps', en: '10,000 steps', ar: '١٠٬٠٠٠ خطوة' },
  { id: 'water', en: '3.5 L water', ar: '٣٫٥ لتر ماء' },
  { id: 'nolq', en: 'Zero liquid calories', ar: 'صفر سعرات سائلة' },
  { id: 'nofry', en: 'Nothing deep-fried', ar: 'لا مقليات' },
  { id: 'kitchen', en: 'Kitchen closed 3 h before bed', ar: 'إغلاق المطبخ ٣ ساعات قبل النوم' },
  { id: 'sleep', en: '7+ hours sleep', ar: '٧ ساعات نوم أو أكثر' },
]

export const MEALS = [
  {
    id: 'm1',
    en: 'Breakfast',
    ar: 'الفطور',
    kcal: '450 kcal · 45 g protein',
    kcalAr: '٤٥٠ سعرة · ٤٥غ بروتين',
    items: [
      { en: '4 whole eggs scrambled with onion, tomato, pepper', ar: '٤ بيضات مع بصل وبندورة وفلفل' },
      { en: '1 slice brown bread or ½ cup oats', ar: 'شريحة خبز أسمر أو نصف كوب شوفان' },
      { en: 'Black coffee — no sugar, no cream', ar: 'قهوة سادة — بلا سكر أو قشطة' },
    ],
    swap: { en: 'Arabic swap: 200 g low-fat labneh + 2 boiled eggs + cucumber & tomato + 1 small khubz asmar', ar: 'بديل عربي: ٢٠٠غ لبنة قليلة الدسم + بيضتان مسلوقتان + خيار وبندورة + رغيف أسمر صغير' },
  },
  {
    id: 'm2',
    en: 'Lunch',
    ar: 'الغداء',
    kcal: '600 kcal · 55 g protein',
    kcalAr: '٦٠٠ سعرة · ٥٥غ بروتين',
    items: [
      { en: '200 g grilled chicken breast, lean beef, or fish', ar: '٢٠٠غ صدر دجاج مشوي أو لحم قليل الدهن أو سمك' },
      { en: '150 g cooked rice, freekeh, burghul, or 1 medium potato', ar: '١٥٠غ أرز مطبوخ أو فريكة أو برغل أو حبة بطاطا متوسطة' },
      { en: 'Large salad + lemon + 1 tsp olive oil', ar: 'سلطة كبيرة + ليمون + ملعقة صغيرة زيت زيتون' },
    ],
    swap: { en: 'Mansaf, maqluba, musakhan: one portion only, no seconds, skip the bread base, double the salad', ar: 'منسف، مقلوبة، مسخن: صحن واحد فقط، بلا إعادة، بلا خبز تحت، وضاعف السلطة' },
  },
  {
    id: 'm3',
    en: 'Around training',
    ar: 'حول التمرين',
    kcal: '350 kcal · 40 g protein',
    kcalAr: '٣٥٠ سعرة · ٤٠غ بروتين',
    items: [
      { en: '1 scoop whey + 1 banana or apple', ar: 'سكوب واي + موزة أو تفاحة' },
      { en: 'Or 250 g Greek yogurt + 30 g nuts', ar: 'أو ٢٥٠غ لبن يوناني + ٣٠غ مكسرات' },
    ],
    swap: null,
  },
  {
    id: 'm4',
    en: 'Dinner',
    ar: 'العشاء',
    kcal: '550 kcal · 50 g protein',
    kcalAr: '٥٥٠ سعرة · ٥٠غ بروتين',
    items: [
      { en: '200 g protein — chicken, fish, tuna, or lean meat', ar: '٢٠٠غ بروتين — دجاج أو سمك أو تونة أو لحم قليل الدهن' },
      { en: 'Big portion of grilled or steamed vegetables', ar: 'كمية كبيرة من الخضار المشوية أو المسلوقة' },
      { en: 'Small carb, or skip it entirely on rest days', ar: 'كربوهيدرات قليلة، أو بلا كربوهيدرات في أيام الراحة' },
    ],
    swap: { en: 'Free all day: green vegetables, cucumber, tomato, lemon, herbs, spices, black coffee, tea, vinegar, mustard', ar: 'مسموح بلا حساب: الخضار الورقية، الخيار، البندورة، الليمون، الأعشاب، البهارات، القهوة السادة، الشاي، الخل، المسطردة' },
  },
]

// Week-12 targets vs. the 11 Sep 2026 InBody baseline.
export const CHECKPOINTS = [
  { en: 'Weight', ar: 'الوزن', start: '120.1 kg', target: '105–107 kg' },
  { en: 'Body fat mass', ar: 'كتلة الدهون', start: '45.3 kg', target: '31–33 kg' },
  { en: 'Body fat %', ar: 'نسبة الدهون', start: '37.7 %', target: '29–31 %' },
  { en: 'Skeletal muscle (hold it)', ar: 'العضلات الهيكلية (حافظ عليها)', start: '41.7 kg', target: '41–42 kg' },
  { en: 'Waist', ar: 'محيط الخصر', start: '125.2 cm', target: '110–113 cm' },
  { en: 'Visceral fat area', ar: 'مساحة الدهون الحشوية', start: '185 cm²', target: '120–135 cm²' },
]
