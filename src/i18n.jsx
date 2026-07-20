// Bilingual (EN / AR) internationalization.
// UI strings are fully translated. Exercise instructions are English in the
// source dataset; we provide Arabic via an exact-sentence dictionary plus a set
// of structural pattern rules, falling back to English for rare long-tail text.

const UI = {
  en: {
    appName: 'PULSE',
    tagline: 'Train smart. Train hard.',
    nav: { home: 'Home', library: 'Library', generator: 'Generator', workouts: 'My Workouts', favorites: 'Favorites', builder: 'Build' },
    builder: {
      browse: 'Browse Library',
      categories: 'Categories',
      equipment: 'Equipment',
      results: 'exercises',
      added: 'Added!',
      addingTo: 'Adding to',
      close: 'Close',
      emptyResults: 'No exercises match your filters.',
      sets: 'Sets',
      reps: 'Reps',
      ocr: 'Scan a photo',
      ocrTitle: 'Photo → Workout',
      ocrHint: 'Upload a photo of a written/printed plan (e.g. a paper or whiteboard). Works best with printed text.',
      ocrHandwriting: 'Handwriting mode (enhances messy writing)',
      ocrUpload: 'Choose image',
      ocrReading: 'Reading image…',
      ocrNorm: 'Enhancing image for handwriting…',
      ocrDone: 'Found',
      ocrNone: 'No exercises recognised. Try a clearer, printed photo.',
      ocrAddAll: 'Add matched to plan',
      ocrNoMatch: 'no match',
      ocrUnknown: 'Unrecognised',
      ocrUnknownHint: 'These lines were not recognised. Add them manually from the library or type a name.',
      ocrAddManual: 'Add manually',
      ocrManualName: 'Exercise name',
      ocrPickLib: 'Pick from library',
      ocrNoExercise: 'No exercise',
    },
    lang: { switchTo: 'العربية', label: 'EN' },
    home: {
      heroTitle: 'Your Pocket Gym Coach',
      heroSub: 'Generate plans, track progress, and master every exercise.',
      cards: {
        generator: { title: 'Workout Generator', sub: 'Build a weekly split in seconds' },
        library: { title: 'Exercise Library', sub: '1324 exercises with GIFs' },
        workouts: { title: 'My Workouts', sub: 'Your saved plans & progress' },
        favorites: { title: 'Favorites', sub: 'Starred exercises' },
      },
      stats: { exercises: 'Exercises', categories: 'Categories', plans: 'Saved Plans' },
    },
    library: {
      title: 'Exercise Library',
      searchPlaceholder: 'Search exercises...',
      all: 'All',
      category: 'Category',
      noResults: 'No exercises found.',
      results: 'exercises',
      openDetail: 'View',
    },
    detail: {
      title: 'Exercise',
      instructions: 'Instructions',
      target: 'Target Muscle',
      secondary: 'Secondary Muscles',
      equipment: 'Equipment',
      category: 'Category',
      bodyPart: 'Body Part',
      backToLibrary: 'Back to Library',
      addToFav: 'Add to Favorites',
      removeFav: 'Remove Favorite',
      noImage: 'No image available',
    },
    generator: {
      title: 'Workout Generator',
      goal: 'Training Goal',
      level: 'Experience Level',
      days: 'Days per Week',
      goals: { muscle: 'Muscle Gain', fat: 'Fat Loss', strength: 'Strength' },
      levels: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
      generate: 'Generate Plan',
      planName: 'Plan Name',
      save: 'Save Plan',
      saved: 'Plan Saved!',
      export: 'Export JSON',
      exportPdf: 'Export PDF',
      empty: 'Fill in the options and generate a plan.',
      selectDays: 'Select days',
      daysLabel: 'days/week',
      exercises: 'exercises',
      duration: 'Course Duration',
      durationLabel: 'months',
      startDate: 'Start Date',
      restDays: 'Rest Days',
      weeklyProgress: 'Weekly Progress',
      pickRestDays: 'Pick rest days',
      ofWeeks: 'weeks',
    },
    workouts: {
      title: 'My Workouts',
      empty: 'No saved plans yet. Generate one!',
      emptyCta: 'Go to Generator',
      open: 'Open',
      delete: 'Delete',
      progress: 'Progress',
      total: 'Total',
      done: 'Completed',
      print: 'Print',
      back: 'Back to Plans',
      day: 'Day',
      exercises: 'Exercises',
      restDay: 'Rest Day',
      noPlans: 'No plans saved.',
    },
    favorites: {
      title: 'Favorites',
      empty: 'No favorite exercises yet.',
      emptyCta: 'Browse Library',
      remove: 'Remove',
    },
    print: {
      title: 'Workout Sheet',
      print: 'Print',
      close: 'Close',
      sets: 'Sets',
      reps: 'Reps',
      day: 'Day',
      generatedOn: 'Generated',
    },
    common: {
      sets: 'Sets',
      reps: 'Reps',
      close: 'Close',
      loading: 'Loading...',
      saved: 'Saved',
      x: 'x',
    },
    footer: 'Built with React + Vite + Tailwind.',
  },

  ar: {
    appName: 'بالس',
    tagline: 'تدرب بذكاء. تدرب بقوة.',
    nav: { home: 'الرئيسية', library: 'المكتبة', generator: 'المولّد', workouts: 'تماريني', favorites: 'المفضلة', builder: 'تمريني' },
    builder: {
      browse: 'تصفح المكتبة',
      categories: 'الفئات',
      equipment: 'الأجهزة',
      results: 'تمرين',
      added: 'انضاف!',
      addingTo: 'تضيف لـ',
      close: 'إغلاق',
      emptyResults: 'لا توجد تمارين تطابق الفلاتر.',
      sets: 'سيتات',
      reps: 'عدات',
      ocr: 'امسح صورة',
      ocrTitle: 'صورة ← تمرين',
      ocrHint: 'ارفع صورة لخطة مكتوبة أو مطبوعة (ورقة أو سبورة). أفضل مع النصوص المطبوعة.',
      ocrHandwriting: 'وضع خط اليد (يحسّن الكتابة الشخبوطية)',
      ocrUpload: 'اختر صورة',
      ocrReading: 'جاري قراءة الصورة…',
      ocrNorm: 'جاري تحسين الصورة لخط اليد…',
      ocrDone: 'تم العثور على',
      ocrNone: 'لم يتم التعرف على تمارين. جرب صورة أوضح ومطبوعة.',
      ocrAddAll: 'أضف المطابِق للخطة',
      ocrNoMatch: 'بدون تطابق',
      ocrUnknown: 'غير معروف',
      ocrUnknownHint: 'هذه الأسطر ما انتعرفت. أضفها يدوياً من المكتبة أو اكتب اسمها.',
      ocrAddManual: 'أضف يدوياً',
      ocrManualName: 'اسم التمرين',
      ocrPickLib: 'اختر من المكتبة',
      ocrNoExercise: 'بدون تمرين',
    },
    lang: { switchTo: 'English', label: 'ع' },
    home: {
      heroTitle: 'مدربك الرياضي في جيبك',
      heroSub: 'أنشئ خطط التدريب، تابع تقدمك، وأتقن كل تمرين.',
      cards: {
        generator: { title: 'مولّد التمارين', sub: 'أنشئ جدولاً أسبوعياً في ثوانٍ' },
        library: { title: 'مكتبة التمارين', sub: '١٣٢٤ تمريناً مع صور متحركة' },
        workouts: { title: 'تماريني', sub: 'خططك المحفوظة وتقدّمك' },
        favorites: { title: 'المفضلة', sub: 'التمارين المميزة بنجمة' },
      },
      stats: { exercises: 'تمرين', categories: 'فئة', plans: 'خطة محفوظة' },
    },
    library: {
      title: 'مكتبة التمارين',
      searchPlaceholder: 'ابحث عن تمرين...',
      all: 'الكل',
      category: 'الفئة',
      noResults: 'لا توجد تمارين مطابقة.',
      results: 'تمرين',
      openDetail: 'عرض',
    },
    detail: {
      title: 'تمرين',
      instructions: 'التعليمات',
      target: 'العضلة المستهدفة',
      secondary: 'العضلات الثانوية',
      equipment: 'المعدات',
      category: 'الفئة',
      bodyPart: 'منطقة الجسم',
      backToLibrary: 'العودة إلى المكتبة',
      addToFav: 'أضف إلى المفضلة',
      removeFav: 'إزالة من المفضلة',
      noImage: 'لا تتوفر صورة',
    },
    generator: {
      title: 'مولّد التمارين',
      goal: 'الهدف التدريبي',
      level: 'مستوى الخبرة',
      days: 'أيام في الأسبوع',
      goals: { muscle: 'زيادة العضل', fat: 'حرق الدهون', strength: 'القوة' },
      levels: { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' },
      generate: 'أنشئ الخطة',
      planName: 'اسم الخطة',
      save: 'حفظ الخطة',
      saved: 'تم حفظ الخطة!',
      export: 'تصدير JSON',
      exportPdf: 'تصدير PDF',
      empty: 'املأ الخيارات وأنشئ خطة.',
      selectDays: 'اختر الأيام',
      daysLabel: 'يوم/أسبوع',
      exercises: 'تمارين',
      duration: 'مدة الكورس',
      durationLabel: 'أشهر',
      startDate: 'يوم البداية',
      restDays: 'أيام الراحة',
      weeklyProgress: 'التقدّم الأسبوعي',
      pickRestDays: 'اختر أيام الراحة',
      ofWeeks: 'أسبوع',
    },
    workouts: {
      title: 'تماريني',
      empty: 'لا توجد خطط محفوظة بعد. أنشئ واحدة!',
      emptyCta: 'اذهب إلى المولّد',
      open: 'فتح',
      delete: 'حذف',
      progress: 'التقدّم',
      total: 'الإجمالي',
      done: 'مكتمل',
      print: 'طباعة',
      back: 'العودة إلى الخطط',
      day: 'يوم',
      exercises: 'تمارين',
      restDay: 'يوم راحة',
      noPlans: 'لا توجد خطط محفوظة.',
    },
    favorites: {
      title: 'المفضلة',
      empty: 'لا توجد تمارين مفضلة بعد.',
      emptyCta: 'تصفّح المكتبة',
      remove: 'إزالة',
    },
    print: {
      title: 'ورقة التمرين',
      print: 'طباعة',
      close: 'إغلاق',
      sets: 'مجموعات',
      reps: 'تكرارات',
      day: 'يوم',
      generatedOn: 'أُنشئت في',
    },
    common: {
      sets: 'مجموعات',
      reps: 'تكرارات',
      close: 'إغلاق',
      loading: 'جارٍ التحميل...',
      saved: 'حُفظ',
      x: '×',
    },
    footer: 'بُني باستخدام React + Vite + Tailwind.',
  },
}

// ---- Exercise instruction translation (EN -> AR) ----
// Exact sentence dictionary (covers the most common instructional sentences).
const SENTENCE_DICT = {
  'Repeat for the desired number of repetitions.': 'كرر العدد المطلوب من التكرارات.',
  'Continue alternating sides for the desired number of repetitions.': 'واصل التناوب بين الجانبين للعدد المطلوب من التكرارات.',
  'Hold the contracted position for a brief pause as you squeeze your biceps.': 'اثبت في وضع الانقباض لحظة مع ضغط عضلات الباي سيبس.',
  'Repeat for the desired number of repetitions, then switch arms.': 'كرر العدد المطلوب من التكرارات، ثم بدّل الذراعين.',
  "Repeat for the desired number of repetitions, then switch sides.": 'كرر العدد المطلوب من التكرارات، ثم بدّل الجانبين.',
  'Lie flat on your back with your knees bent and feet flat on the ground.': 'استلقِ على ظهرك مع ثني الركبتين وثبات القدمين على الأرض.',
  'Inhale and slowly begin to lower the dumbbells back to the starting position.': 'استنشق وابدأ ببطء بإنزال الدمبلات إلى وضع البداية.',
  'Pause for a moment at the top, then slowly lower your upper body back down to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل جذعك ببطء إلى وضع البداية.',
  'Repeat for the desired number of repetitions, then switch to the other arm.': 'كرر العدد المطلوب من التكرارات، ثم بدّل إلى الذراع الأخرى.',
  'Bend your knees slightly and hinge forward at the hips, keeping your back straight.': 'اثنِ ركبتيك قليلاً وانحنِ للأمام من الورك مع إبقاء ظهرك مستقيماً.',
  'Keeping your upper arms stationary, exhale and curl the weights while contracting your biceps.': 'مع إبقاء ذراعيك العلويتين ثابتتين، ازفر ولفّ الأوزان مع انقباض عضلات الباي سيبس.',
  'Pause for a moment at the top, then slowly lower your heels back down to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل كعبيك ببطء إلى وضع البداية.',
  'Place your hands behind your head with your elbows pointing outwards.': 'ضع يديك خلف رأسك مع توجيه مرفقيك للخارج.',
  'Pause for a moment at the top, then slowly lower your legs back down to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل ساقيك ببطء إلى وضع البداية.',
  'Pause for a moment at the top, then slowly lower your arms back down to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل ذراعيك ببطء إلى وضع البداية.',
  'Set up an incline bench at a 45-degree angle.': 'جهّز مقعداً مائلاً بزاوية ٤٥ درجة.',
  'Stand with your feet shoulder-width apart.': 'قف بقدمين متباعدتين بعرض الكتفين.',
  'Stand with your feet shoulder-width apart and your knees slightly bent.': 'قف بقدمين متباعدتين بعرض الكتفين مع ثني ركبتيك قليلاً.',
  'Continue to raise the dumbbells until your biceps are fully contracted and the dumbbells are at shoulder level.': 'واصل رفع الدمبلات حتى ينقبض الباي سيبس تماماً وتصبح الدمبلات عند مستوى الكتف.',
  'Pause for a moment at the top, then slowly lower your body back down to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل جسمك ببطء إلى وضع البداية.',
  'Pause for a moment at the bottom, then push through your heels to return to the starting position.': 'توقف للحظة في الأسفل، ثم ادفع بكعبيك للعودة إلى وضع البداية.',
  'Pause for a moment at the top, squeezing your biceps.': 'توقف للحظة في الأعلى مع ضغط عضلات الباي سيبس.',
  'Sit on a bench with your back straight and feet flat on the ground.': 'اجلس على مقعد مع إبقاء ظهرك مستقيماً وقدميك على الأرض.',
  'Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل الدمبل ببطء إلى وضع البداية.',
  'Repeat on the other side.': 'كرر على الجانب الآخر.',
  'Stand facing the machine with your feet shoulder-width apart.': 'قف مواجهاً الجهاز بقدمين متباعدتين بعرض الكتفين.',
  'Pause for a moment at the top, then slowly lower the dumbbells back down to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل الدمبلات ببطء إلى وضع البداية.',
  'Continue alternating arms for the desired number of repetitions.': 'واصل التناوب بين الذراعين للعدد المطلوب من التكرارات.',
  'Repeat for the desired number of repetitions, then switch legs.': 'كرر العدد المطلوب من التكرارات، ثم بدّل الساقين.',
  'Keep your back straight and your core engaged.': 'حافظ على استقامة ظهرك وشدّ عضلات البطن.',
  'Stand facing the cable machine with your feet shoulder-width apart.': 'قف مواجهاً جهاز الكابل بقدمين متباعدتين بعرض الكتفين.',
  'Pause for a moment at the top of the movement, squeezing your biceps.': 'توقف للحظة في أعلى الحركة مع ضغط عضلات الباي سيبس.',
  'Pause for a moment at the top, then slowly lower the barbell back down to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل البار ببطء إلى وضع البداية.',
  'Continue to raise the weights until your biceps are fully contracted and the dumbbells are at shoulder level.': 'واصل رفع الأوزان حتى ينقبض الباي سيبس تماماً وتصبح الدمبلات عند مستوى الكتف.',
  'Keep your back straight and engage your core.': 'حافظ على استقامة ظهرك وشدّ عضلات البطن.',
  'Push the barbell back up to the starting position, fully extending your arms.': 'ادفع البار للأعلى إلى وضع البداية مع مدّ ذراعيك بالكامل.',
  'Continue pulling until your chin is above the bar.': 'واصل السحب حتى يصبح ذقنك فوق القضيب.',
  'Continue alternating legs for the desired number of repetitions.': 'واصل التناوب بين الساقين للعدد المطلوب من التكرارات.',
  'Sit on an exercise ball with your feet flat on the ground and your back straight.': 'اجلس على كرة التمرين مع ثبات القدمين على الأرض وإبقاء ظهرك مستقيماً.',
  'Inhale and slowly lower the dumbbell back to the starting position.': 'استنشق وأنزل الدمبل ببطء إلى وضع البداية.',
  'Push through your palms to extend your arms and return to the starting position.': 'ادفع بكفيك لمدّ ذراعيك والعودة إلى وضع البداية.',
  'Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.': 'امسك المقابض بقبضة علوية أعرض قليلاً من عرض الكتفين.',
  'Hang from a pull-up bar with your arms fully extended and your palms facing away from you.': 'تعلّق من قضيب العقلة مع مدّ ذراعيك بالكامل وتوجيه راحتيك للخارج.',
  'Pause for a moment, then return to the starting position.': 'توقف للحظة، ثم عُد إلى وضع البداية.',
  'Grasp the barbell with an overhand grip, slightly wider than shoulder-width apart.': 'امسك البار بقبضة علوية أعرض قليلاً من عرض الكتفين.',
  'Pause for a moment, then slowly return to the starting position.': 'توقف للحظة، ثم عُد ببطء إلى وضع البداية.',
  'Continue lowering until your thighs are parallel to the ground, or as low as you can comfortably go.': 'واصل النزول حتى تصبح فخذاك موازيتين للأرض، أو قدر استطاعتك براحة.',
  'Pause for a moment at the bottom, then push the barbell back up to the starting position.': 'توقف للحظة في الأسفل، ثم ادفع البار للأعلى إلى وضع البداية.',
  'Stand with your feet shoulder-width apart, toes slightly turned out.': 'قف بقدمين متباعدتين بعرض الكتفين مع توجيه أصابع القدمين للخارج قليلاً.',
  'Pause for a moment, then extend your arms back up to the starting position.': 'توقف للحظة، ثم مدّ ذراعيك للأعلى إلى وضع البداية.',
  'Repeat for the desired number of repetitions, then switch legs and repeat.': 'كرر العدد المطلوب من التكرارات، ثم بدّل الساقين وكرّر.',
  'Repeat with the other arm.': 'كرر بالذراع الأخرى.',
  'Stand facing a cable machine with your feet shoulder-width apart.': 'قف مواجهاً جهاز الكابل بقدمين متباعدتين بعرض الكتفين.',
  'Pause for a moment at the bottom, then slowly return to the starting position.': 'توقف للحظة في الأسفل، ثم عُد ببطء إلى وضع البداية.',
  'Repeat with the other leg.': 'كرر بالساق الأخرى.',
  'Pause for a moment at the bottom, then push yourself back up to the starting position.': 'توقف للحظة في الأسفل، ثم ادفع نفسك للأعلى إلى وضع البداية.',
  'Pause for a moment at the top, then slowly lower your hips back down to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل وركيك ببطء إلى وضع البداية.',
  'Pause for a moment when the barbell touches your chest.': 'توقف للحظة عندما يلامس البار صدرك.',
  'Pause for a moment, then push through your heels to return to the starting position.': 'توقف للحظة، ثم ادفع بكعبيك للعودة إلى وضع البداية.',
  'Lie flat on a bench with your feet flat on the ground and your back pressed against the bench.': 'استلقِ على مقعد مع ثبات القدمين على الأرض وضغط ظهرك على المقعد.',
  'Stand facing away from the machine with your feet shoulder-width apart.': 'قف مواجهاً بظهرك للجهاز بقدمين متباعدتين بعرض الكتفين.',
  'Pause for a moment, then extend your arms back to the starting position.': 'توقف للحظة، ثم مدّ ذراعيك للخلف إلى وضع البداية.',
  'Continue to raise the dumbbell until your biceps are fully contracted and the dumbbell is at shoulder level.': 'واصل رفع الدمبل حتى ينقبض الباي سيبس تماماً ويصبح الدمبل عند مستوى الكتف.',
  'Stand with your feet shoulder-width apart, holding a dumbbell in each hand with an overhand grip.': 'قف بقدمين متباعدتين بعرض الكتفين، ممسكاً دمبلاً في كل يد بقبضة علوية.',
  'Stand with your feet shoulder-width apart, holding a dumbbell in each hand.': 'قف بقدمين متباعدتين بعرض الكتفين، ممسكاً دمبلاً في كل يد.',
  'Stand with your feet shoulder-width apart and hold a dumbbell in each hand.': 'قف بقدمين متباعدتين بعرض الكتفين واحمل دمبلاً في كل يد.',
  'Bend your knees slightly and engage your core.': 'اثنِ ركبتيك قليلاً وشدّ عضلات البطن.',
  'Sit on the ground with your legs extended in front of you.': 'اجلس على الأرض مع مدّ ساقيك أمامك.',
  'Slowly lower your legs back down to the starting position.': 'أنزل ساقيك ببطء إلى وضع البداية.',
  'Lie flat on your back with your legs extended and your arms by your sides.': 'استلقِ على ظهرك مع مدّ ساقيك ووضع ذراعيك بجانبيك.',
  'Pause for a moment at the top, then slowly lower your heel back down to the starting position.': 'توقف للحظة في الأعلى، ثم أنزل كعبيك ببطء إلى وضع البداية.',
  'Lower until your thighs are parallel to the ground, or as low as you can comfortably go.': 'انزل حتى تصبح فخذاك موازيتين للأرض، أو قدر استطاعتك براحة.',
  'Lower your body into a squat position by bending your knees and pushing your hips back.': 'اخفض جسمك إلى وضع القرفصاء بثني الركبتين ودفع الوركين للخلف.',
  'Keep your back straight and core engaged.': 'حافظ على استقامة ظهرك وشدّ عضلات البطن.',
  'Grasp the bar with an overhand grip, slightly wider than shoulder-width apart.': 'امسك القضيب بقبضة علوية أعرض قليلاً من عرض الكتفين.',
  'Grasp the bar with an underhand grip, hands shoulder-width apart.': 'امسك القضيب بقبضة سفلية، بأيدٍ متباعدة بعرض الكتفين.',
  'Keep your elbows close to your sides and your upper arms stationary throughout the exercise.': 'حافظ على قرب مرفقيك من جانبيك وثبات ذراعيك العلويتين طوال التمرين.',
  'Place your hands behind your head or cross them over your chest.': 'ضع يديك خلف رأسك أو اقلبهما على صدرك.',
  'Pause for a moment at the top, then inhale and slowly lower the dumbbells back down to the starting position.': 'توقف للحظة في الأعلى، ثم استنشق وأنزل الدمبلات ببطء إلى وضع البداية.',
  'Pause for a moment, then raise the dumbbell back to the starting position.': 'توقف للحظة، ثم ارفع الدمبل إلى وضع البداية.',
  'Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.': 'توقف للحظة في ذروة الحركة، ثم أفلت المقابض ببطء إلى وضع البداية.',
  'Stand facing the anchor point with your feet shoulder-width apart.': 'قف مواجهاً نقطة التثبيت بقدمين متباعدتين بعرض الكتفين.',
  'Pause for a moment at the end of the movement, then slowly return to the starting position.': 'توقف للحظة في نهاية الحركة، ثم عُد ببطء إلى وضع البداية.',
  'Push through your right heel to return to the starting position.': 'ادفع بكعب قدمك اليمنى للعودة إلى وضع البداية.',
  'Lift the barbell off the rack and hold it directly above your chest with your arms fully extended.': 'ارفع البار من الحامل واحمله فوق صدرك مباشرة مع مدّ ذراعيك بالكامل.',
  'Hold the barbell across your upper back, resting it on your traps or rear delts.': 'احمل البار عبر ظهرك العلوي، مستنداً على عضلات الـترابس أو الدلتا الخلفية.',
  'Stand with your feet shoulder-width apart and toes slightly turned out.': 'قف بقدمين متباعدتين بعرض الكتفين مع توجيه أصابع القدمين للخارج قليلاً.',
  'Rest your forearms on your thighs, allowing your wrists to hang off the edge.': 'استند بساعديك على فخذيك مع ترك معصميك متدليين من الحافة.',
  'Bend your knees slightly and hinge forward at the hips, keeping your back straight and chest up.': 'اثنِ ركبتيك قليلاً وانحنِ للأمام من الورك مع إبقاء ظهرك مستقيماً وصدراً مرفوعاً.',
  'Push yourself back up to the starting position by straightening your arms.': 'ادفع نفسك للأعلى إلى وضع البداية بمدّ ذراعيك.',
  'Bend forward at the hips, keeping your back straight and your core engaged.': 'انحنِ للأمام من الورك مع إبقاء ظهرك مستقيماً وشدّ عضلات البطن.',
  'Keep your elbows close to your sides and your upper arms stationary.': 'حافظ على قرب مرفقيك من جانبيك وثبات ذراعيك العلويتين.',
  'Lower your body towards the ground by bending your elbows, keeping them close to your sides.': 'اخفض جسمك نحو الأرض بثني مرفقيك مع إبقائهما قريبين من جانبيك.',
  'Sit on the stability ball with your feet flat on the ground and your knees bent at a 90-degree angle.': 'اجلس على كرة التمرين مع ثبات القدمين على الأرض وثني الركبتين بزاوية ٩٠ درجة.',
  'Repeat for the recommended amount of repetitions.': 'كرر العدد الموصى به من التكرارات.',
  'Take a step forward with your right foot, lowering your body into a lunge position.': 'خطُ خطوة للأمام بقدمك اليمنى، مخفضاً جسمك إلى وضع الاندفاع.',
  'Stand up straight with a dumbbell in each hand, palms facing your torso.': 'قف منتصباً مع دمبل في كل يد، وراحتا يديك تجاه جذعك.',
  'Hang from the bar with your arms fully extended and your body straight.': 'تعلّق من القضيب مع مدّ ذراعيك بالكامل وإبقاء جسمك مستقيماً.',
  'Pause for a moment, then push yourself back up to the starting position by straightening your arms.': 'توقف للحظة، ثم ادفع نفسك للأعلى إلى وضع البداية بمدّ ذراعيك.',
  'Pause for a moment at the bottom, then push yourself back up to the starting position by straightening your arms.': 'توقف للحظة في الأسفل، ثم ادفع نفسك للأعلى إلى وضع البداية بمدّ ذراعيك.',
  'Adjust the seat height and position yourself on the machine with your back against the pad.': 'اضبط ارتفاع المقعد واجلس على الجهاز مع استناد ظهرك إلى الوسادة.',
  'Engage your core and pull your shoulder blades down and back.': 'شدّ عضلات البطن واسحب لوحي كتفيك للأسفل والخلف.',
  'Lower your body by bending your elbows until your upper arms are parallel to the floor.': 'اخفض جسمك بثني مرفقيك حتى تصبح ذراعاك العلويتان موازيتين للأرض.',
  'Place your hands under your glutes for support.': 'ضع يديك تحت الأرداف للدعم.',
  'Sit on a stability ball with your feet flat on the ground and your back straight.': 'اجلس على كرة التمرين مع ثبات القدمين على الأرض وإبقاء ظهرك مستقيماً.',
  'Stand tall with your feet shoulder-width apart.': 'قف منتصباً بقدمين متباعدتين بعرض الكتفين.',
  'Lie on your back with your knees bent and feet flat on the ground.': 'استلقِ على ظهرك مع ثني الركبتين وثبات القدمين على الأرض.',
  'Squeeze your shoulder blades together at the top of the movement.': 'اضغط لوحي كتفيك معاً في أعلى الحركة.',
  'Sit on a bench or chair with your feet flat on the ground.': 'اجلس على مقعد أو كرسي مع ثبات القدمين على الأرض.',
  'Sit on a chair or bench with your back straight and feet flat on the ground.': 'اجلس على كرسي أو مقعد مع إبقاء ظهرك مستقيماً وقدميك على الأرض.',
  'Hold the contraction for a moment, then slowly lower your shoulders back down to the starting position.': 'اثبت الانقباض للحظة، ثم أنزل كتفيك ببطء إلى وضع البداية.',
  'Inhale and slowly begin to lower the barbell back to the starting position.': 'استنشق وابدأ ببطء بإنزال البار إلى وضع البداية.',
  'Grasp the barbell with a close grip, slightly narrower than shoulder-width apart.': 'امسك البار بقبضة ضيقة أضيق قليلاً من عرض الكتفين.',
  'Hold the stretch for 20-30 seconds.': 'اثبت التمدد لمدة ٢٠-٣٠ ثانية.',
  'Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.': 'مع شدّ عضلات البطن، ارفع جذعك ببطء عن الأرض متقدّماً للأمام حتى يصبح جذعك بزاوية ٤٥ درجة.',
  'Pause for a moment at the top, then slowly lower your upper body back down to the th': 'توقف للحظة في الأعلى، ثم أنزل جذعك ببطء إلى وضع البداية.',
}

// Structural pattern rules for sentences not in the exact dictionary.
// Order matters: first match wins.
const PATTERN_RULES = [
  [/^repeat for the desired number of repetitions/i, 'كرر العدد المطلوب من التكرارات.'],
  [/^repeat (with|on) the other (arm|leg|side)/i, 'كرر بالطرف الآخر.'],
  [/^continue alternating (arms|legs|sides)/i, 'واصل التناوب بين الأطراف للعدد المطلوب من التكرارات.'],
  [/^repeat for the recommended amount/i, 'كرر العدد الموصى به من التكرارات.'],
  [/^pause for a moment/i, 'توقف للحظة.'],
  [/^hold the (stretch|contraction)/i, 'اثبت التمدد للحظة.'],
  [/^inhale/i, 'استنشق.'],
  [/^exhale/i, 'ازفر.'],
  [/^stand (with|tall|up)/i, 'قف مستقيماً.'],
  [/^sit (on|with)/i, 'اجلس.'],
  [/^lie (flat|on|with)/i, 'استلقِ.'],
  [/^lower your body/i, 'اخفض جسمك.'],
  [/^slowly lower/i, 'اخفض ببطء.'],
  [/^push through/i, 'ادفع بكعبيك.'],
  [/^push yourself back up/i, 'ادفع نفسك للأعلى.'],
  [/^keep your back straight/i, 'حافظ على استقامة ظهرك.'],
  [/^engage your core/i, 'شدّ عضلات البطن.'],
  [/^bend (your knees|forward)/i, 'اثنِ ركبتيك.'],
  [/^grasp (the|the bar|the handles|the barbell|the dumbbell)/i, 'امسك بقبضة ثابتة.'],
  [/^squeeze/i, 'اضغط عضلياً.'],
  [/^continue to raise|continue raising/i, 'واصل الرفع.'],
  [/^continue pulling|continue to pull/i, 'واصل السحب.'],
  [/^continue lowering/i, 'واصل النزول.'],
]

// Equipment / muscle name small dictionary for nicer AR in detail pages.
const TERM_DICT = {
  'body weight': 'وزن الجسم',
  'dumbbell': 'دمبل',
  'barbell': 'بار',
  'kettlebell': 'كيتل بيل',
  'cable': 'كابل',
  'machine': 'جهاز',
  'band': 'شريط مقاومة',
  'bench': 'مقعد',
  'abs': 'البطن',
  'biceps': 'الباي سيبس',
  'chest': 'الصدر',
  'back': 'الظهر',
  'shoulders': 'الأكتاف',
  'legs': 'الساقين',
  'triceps': 'التراي سيبس',
  'glutes': 'الأرداف',
  'quadriceps': 'الفخذ الأمامي',
  'hamstrings': 'الفخذ الخلفي',
  'calves': 'عضلات الساق',
  'core': 'البطن والوسط',
  'lats': 'الظهر العريض',
  'traps': 'عضلات العنق/الترابس',
  'forearms': 'الساعدين',
  'cardio': 'تمارين القلب',
}

export function translateTerm(en) {
  if (!en) return ''
  return TERM_DICT[en.toLowerCase()] || en
}

export function translateSentence(en) {
  if (!en) return ''
  const key = en.trim()
  if (SENTENCE_DICT[key]) return SENTENCE_DICT[key]
  for (const [re, ar] of PATTERN_RULES) {
    if (re.test(key)) return ar
  }
  // Long-tail: return English source (dataset is English-only).
  return en
}

export function translateSteps(steps, lang) {
  if (lang === 'ar') {
    return (steps || []).map((s) => translateSentence(s))
  }
  return steps || []
}

export function translateDesc(desc, lang) {
  if (lang !== 'ar' || !desc) return desc || ''
  // Translate sentence by sentence for better coverage.
  const sentences = desc.match(/[^.!?]+[.!?]+/g) || [desc]
  return sentences.map((s) => translateSentence(s)).join(' ')
}

// ---- React context for language ----
import { createContext, useContext, useState, useEffect } from 'react'

const LangContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('pulse.lang') || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('pulse.lang', lang)
    } catch {}
  }, [lang])

  const t = (path) => {
    const parts = path.split('.')
    let node = UI[lang]
    for (const p of parts) {
      if (node == null) break
      node = node[p]
    }
    if (node == null) {
      // fallback to English
      node = UI.en
      for (const p of parts) {
        if (node == null) break
        node = node[p]
      }
    }
    return node == null ? path : node
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
