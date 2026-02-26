import type { Locale } from "./i18n";

export type TranslationKeys = {
  nav: { home: string; edit: string; pricing: string; gallery: string; signIn: string; signOut: string };
  login: { welcomeToBrand: string; continueWithGoogle: string; redirecting: string; pleaseComplete: string; agreeTerms: string; and: string; terms: string; privacyPolicy: string };
  home: {
    hero: { badge: string; title: string; subtitle: string; cta: string; uploadTitle: string; uploadHint: string; privacyNote: string };
    features: { title: string; subtitle: string };
    feature: {
      portrait: { title: string; desc: string };
      colorize: { title: string; desc: string };
      attire: { title: string; desc: string };
      background: { title: string; desc: string };
      composite: { title: string; desc: string };
      poster: { title: string; desc: string };
    };
    pricing: { title: string; subtitle: string };
    cta: { title: string; subtitle: string; button: string };
  };
  pricing: {
    title: string;
    subtitle: string;
    basic: { name: string; price: string; desc: string; f1: string; f2: string };
    standard: { name: string; price: string; desc: string; f1: string; f2: string; f3: string };
    premium: { name: string; price: string; desc: string; f1: string; f2: string; f3: string; f4: string };
    buy: string;
    popular: string;
  };
  edit: {
    title: string;
    upload: string;
    uploadHint: string;
    selectFunction: string;
    portrait: string;
    colorize: string;
    attire: string;
    background: string;
    composite: string;
    poster: string;
    generate: string;
    generating: string;
    download: string;
    downloadHiRes: string;
    batchMode: string;
    batchHint: string;
    noPermission: string;
    loginRequired: string;
    result: string;
    original: string;
    addMore: string;
    processing: string;
    printSizes: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    empty: string;
    loading: string;
    loginRequired: string;
    download: string;
    type: string;
    date: string;
  };
  footer: { brand: string; tagline: string; terms: string; privacy: string; copyright: string };
  reviews: { title: string; subtitle: string };
  featureSection: {
    badge: string;
    title: string;
    portrait: { tag: string; title: string; desc: string; b1: string; b2: string; b3: string };
    colorize: { tag: string; title: string; desc: string; b1: string; b2: string; b3: string };
    attire: { tag: string; title: string; desc: string; b1: string; b2: string; b3: string };
    background: { tag: string; title: string; desc: string; b1: string; b2: string; b3: string };
  };
  toolsSection: {
    title: string;
    subtitle: string;
    tools: {
      portrait: { title: string; desc: string };
      colorize: { title: string; desc: string };
      attire: { title: string; desc: string };
      background: { title: string; desc: string };
      composite: { title: string; desc: string };
      poster: { title: string; desc: string };
    };
  };
  cookieConsent: { message: string; accept: string; learnMore: string };
  common: { loading: string; error: string; success: string; back: string };
};

const en: TranslationKeys = {
  nav: { home: "Home", edit: "Editor", pricing: "Pricing", gallery: "My Gallery", signIn: "Sign In", signOut: "Sign Out" },
  login: { welcomeToBrand: "Welcome to Funeral Photo Editing", continueWithGoogle: "Continue with Google", redirecting: "Redirecting…", pleaseComplete: "Please complete sign-in in the popup.", agreeTerms: "By continuing, you agree to our ", and: " and ", terms: "Terms of Service", privacyPolicy: "Privacy Policy" },
  home: {
    hero: { badge: "Honoring Heritage, Preserving Dignity", title: "Dignified Memories,\nBeautifully Restored", subtitle: "Give their legacy the reverence it deserves — transform cherished photos into lasting, honorable memorial portraits.", cta: "Begin Honoring Their Memory", uploadTitle: "Upload a Cherished Photo", uploadHint: "Drag & drop or click — JPG, PNG up to 10 MB. Your memories stay private.", privacyNote: "Photos are never stored or shared" },
    features: { title: "A Lasting Tribute, Thoughtfully Crafted", subtitle: "Every tool designed to honor heritage and preserve what matters most" },
    feature: {
      portrait: { title: "Dignified Portrait", desc: "A formal, reverent memorial portrait — honoring them as they deserve to be remembered" },
      colorize: { title: "Heritage in Color", desc: "Breathe warmth and life back into treasured black & white family heirlooms" },
      attire: { title: "Graceful Attire", desc: "Dress them in respectful formal wear befitting the solemnity of remembrance" },
      background: { title: "Serene Backdrop", desc: "A clean, peaceful background that keeps all focus on the person you love" },
      composite: { title: "Family Together", desc: "Unite loved ones in a single, timeless family portrait — together once more" },
      poster: { title: "Memorial Keepsake", desc: "A beautiful commemorative poster to share and preserve their lasting memory" },
    },
    pricing: { title: "Transparent & Compassionate Pricing", subtitle: "One heartfelt purchase — no subscriptions, no hidden fees" },
    cta: { title: "Ready to Create a Lasting Tribute?", subtitle: "Honor their memory with a portrait that speaks of love, dignity, and remembrance.", button: "Begin Their Tribute" },
  },
  pricing: {
    title: "Choose Your Plan",
    subtitle: "One-time purchase — use anytime",
    basic: { name: "Basic", price: "$0.99", desc: "For a single memorial portrait", f1: "1 B&W formal portrait", f2: "1 memorial poster" },
    standard: { name: "Standard", price: "$9.99", desc: "Multiple formats and sizes", f1: "Multiple poster sizes & formats", f2: "Multiple formal portraits", f3: "Batch processing (10 each)" },
    premium: { name: "Premium", price: "$39.99", desc: "All features, unlimited use", f1: "All features included", f2: "Colorization & attire replacement", f3: "Background editing & composites", f4: "Print-ready high resolution" },
    buy: "Purchase",
    popular: "Most Popular",
  },
  edit: {
    title: "Memorial Photo Editor",
    upload: "Upload Photo",
    uploadHint: "Drag & drop or click to upload (JPG, PNG, max 10MB)",
    selectFunction: "Select Function",
    portrait: "Formal Portrait",
    colorize: "Colorize",
    attire: "Replace Attire",
    background: "Edit Background",
    composite: "Family Composite",
    poster: "Memorial Poster",
    generate: "Generate",
    generating: "Processing…",
    download: "Download",
    downloadHiRes: "Download High-Res",
    batchMode: "Batch Mode",
    batchHint: "Upload multiple photos for batch processing",
    noPermission: "Your current plan does not include this feature. Please upgrade.",
    loginRequired: "Please sign in to use the editor.",
    result: "Result",
    original: "Original",
    addMore: "Add More Photos",
    processing: "Processing",
    printSizes: "Print Sizes",
  },
  gallery: {
    title: "My Gallery",
    subtitle: "View all your generated memorial photos",
    empty: "No generations yet. Start by editing a photo.",
    loading: "Loading your gallery…",
    loginRequired: "Please sign in to view your gallery.",
    download: "Download",
    type: "Type",
    date: "Date",
  },
  reviews: { title: "Trusted by Families Worldwide", subtitle: "Real stories from families who used our memorial photo services" },
  featureSection: {
    badge: "How We Help",
    title: "Professional Memorial Photo Processing",
    portrait: { tag: "Formal Portrait", title: "Create Dignified Memorial Portraits", desc: "Transform any casual photo into a formal, respectful memorial portrait suitable for funeral services and remembrance.", b1: "Standard portrait ratio with professional composition", b2: "Formal dark attire automatically applied", b3: "Multiple background options (blue, black, white, gray)" },
    colorize: { tag: "Colorization", title: "Bring Vintage Photos to Life", desc: "Restore natural colors to black & white memorial photographs with AI-powered colorization that respects the original character.", b1: "Realistic skin tones and fabric colors", b2: "Historically accurate color palette", b3: "Preserves the dignity and original texture" },
    attire: { tag: "Attire Change", title: "Respectful Attire Replacement", desc: "Replace casual clothing with formal attire appropriate for memorial and funeral services.", b1: "Seamless integration with natural lighting", b2: "Dark suits, formal wear options", b3: "Face and expression remain completely untouched" },
    background: { tag: "Background Edit", title: "Clean, Professional Backgrounds", desc: "Remove distracting backgrounds and replace with solid colors or gradients suitable for formal memorial portraits.", b1: "Clean edges with no artifacts", b2: "Solid colors or soft gradients", b3: "Subject appearance preserved exactly" },
  },
  toolsSection: {
    title: "All Memorial Photo Tools",
    subtitle: "Select a tool to begin editing your memorial photos",
    tools: {
      portrait: { title: "Formal Portrait Generation", desc: "Standard memorial portrait with formal attire and background" },
      colorize: { title: "B&W Photo Colorization", desc: "Add natural colors to black & white photographs" },
      attire: { title: "Attire Replacement", desc: "Replace clothing with formal funeral attire" },
      background: { title: "Background Editing", desc: "Remove or replace backgrounds with solid colors" },
      composite: { title: "Family Composite Portrait", desc: "Combine multiple photos into one family portrait" },
      poster: { title: "Memorial Poster Design", desc: "Create dignified memorial posters with custom text" },
    },
  },
  footer: { brand: "Funeral Photo Editing", tagline: "Dignified memorial photo services powered by AI", terms: "Terms of Service", privacy: "Privacy Policy", copyright: "© 2026 Funeral Photo Editing. All rights reserved." },
  cookieConsent: { message: "We use cookies to improve your experience.", accept: "Accept", learnMore: "Learn More" },
  common: { loading: "Loading…", error: "An error occurred.", success: "Success!", back: "Back" },
};

const ja: TranslationKeys = {
  nav: { home: "ホーム", edit: "エディタ", pricing: "料金", gallery: "マイギャラリー", signIn: "ログイン", signOut: "ログアウト" },
  login: { welcomeToBrand: "遺影写真編集へようこそ", continueWithGoogle: "Googleでログイン", redirecting: "リダイレクト中…", pleaseComplete: "ポップアップでログインを完了してください。", agreeTerms: "続行することで、", and: "および", terms: "利用規約", privacyPolicy: "プライバシーポリシー" },
  home: {
    hero: { badge: "遺産を敬い、尊厳を守る", title: "尊厳ある思い出を、\n美しく蘇らせる", subtitle: "大切な方の遺産にふさわしい敬意を——愛する写真を永遠に残る、格式ある遺影に。", cta: "追悼の想いを形に", uploadTitle: "大切なお写真をアップロード", uploadHint: "ドラッグ＆ドロップまたはクリック — JPG、PNG（最大10MB）", privacyNote: "お写真は保存・共有されません" },
    features: { title: "心を込めた、永遠の追悼", subtitle: "すべての機能が、遺産への敬意と大切なものの保存のために設計されています" },
    feature: {
      portrait: { title: "格式ある遺影", desc: "故人にふさわしい、敬意に満ちたフォーマルな遺影ポートレート" },
      colorize: { title: "色彩の蘇り", desc: "大切な白黒の家族の宝物に、温かみと生命の息吹を" },
      attire: { title: "品格ある装い", desc: "追悼の厳粛さにふさわしい、敬意ある正装へ" },
      background: { title: "静謐な背景", desc: "愛する方にすべての焦点を当てる、清らかで穏やかな背景" },
      composite: { title: "家族の再会", desc: "愛する方々をひとつの永遠の家族写真に——もう一度、共に" },
      poster: { title: "追悼の記念品", desc: "その永遠の思い出を分かち合い、守るための美しい記念ポスター" },
    },
    pricing: { title: "透明で心のこもった料金", subtitle: "一回限りの購入——サブスク不要、隠れた費用なし" },
    cta: { title: "永遠の追悼を作成する準備はできましたか？", subtitle: "愛と尊厳と追憶を伝える遺影で、その思い出を称えましょう。", button: "追悼を始める" },
  },
  pricing: {
    title: "プランを選択",
    subtitle: "一回限りの購入——いつでも使用可能",
    basic: { name: "ベーシック", price: "$0.99", desc: "遺影ポートレート1枚向け", f1: "白黒正装遺影 1枚", f2: "追悼ポスター 1枚" },
    standard: { name: "スタンダード", price: "$9.99", desc: "複数のフォーマットとサイズ", f1: "複数サイズのポスター", f2: "複数の正装写真", f3: "バッチ処理（各10枚）" },
    premium: { name: "プレミアム", price: "$39.99", desc: "全機能、無制限使用", f1: "全機能利用可能", f2: "カラー化・服装変更", f3: "背景編集・合成写真", f4: "印刷用高解像度出力" },
    buy: "購入する",
    popular: "人気プラン",
  },
  edit: {
    title: "遺影写真エディタ",
    upload: "写真をアップロード",
    uploadHint: "ドラッグ＆ドロップまたはクリック（JPG、PNG、最大10MB）",
    selectFunction: "機能を選択",
    portrait: "正装遺影",
    colorize: "カラー化",
    attire: "服装変更",
    background: "背景編集",
    composite: "家族合成",
    poster: "追悼ポスター",
    generate: "生成",
    generating: "処理中…",
    download: "ダウンロード",
    downloadHiRes: "高解像度ダウンロード",
    batchMode: "バッチモード",
    batchHint: "複数の写真をアップロードしてバッチ処理",
    noPermission: "現在のプランにはこの機能が含まれていません。アップグレードしてください。",
    loginRequired: "エディタを使用するにはログインしてください。",
    result: "結果",
    original: "オリジナル",
    addMore: "写真を追加",
    processing: "処理中",
    printSizes: "印刷サイズ",
  },
  gallery: {
    title: "マイギャラリー",
    subtitle: "生成した遺影写真をすべて表示",
    empty: "まだ生成された写真がありません。写真の編集から始めましょう。",
    loading: "ギャラリーを読み込み中…",
    loginRequired: "ギャラリーを見るにはログインしてください。",
    download: "ダウンロード",
    type: "タイプ",
    date: "日付",
  },
  reviews: { title: "世界中のご家族から信頼されています", subtitle: "当サービスをご利用いただいたご家族の声" },
  featureSection: {
    badge: "サービス内容",
    title: "プロフェッショナルな遺影写真加工",
    portrait: { tag: "正装遺影", title: "格式ある遺影ポートレートの作成", desc: "普段の写真から、葬儀にふさわしいフォーマルで敬意に満ちた遺影ポートレートを作成します。", b1: "プロ仕様の構図で標準的なポートレート比率", b2: "正式なダーク系の服装を自動適用", b3: "複数の背景オプション（青・黒・白・グレー）" },
    colorize: { tag: "カラー化", title: "ヴィンテージ写真に色彩を", desc: "AIカラー化技術で白黒の遺影写真に自然な色彩を加え、元の雰囲気を尊重しながら蘇らせます。", b1: "自然な肌の色と衣服の色彩", b2: "時代に即した正確なカラーパレット", b3: "元のテクスチャーと品格を保持" },
    attire: { tag: "服装変更", title: "敬意ある服装への変更", desc: "カジュアルな服装を、葬儀やメモリアルサービスにふさわしいフォーマルな装いに変更します。", b1: "自然な照明との完璧な統合", b2: "ダークスーツ、フォーマルウェアの選択肢", b3: "顔と表情は完全に変更なし" },
    background: { tag: "背景編集", title: "きれいでプロフェッショナルな背景", desc: "気が散る背景を除去し、フォーマルな遺影にふさわしい単色やグラデーションに置き換えます。", b1: "アーティファクトのないきれいなエッジ", b2: "単色またはソフトグラデーション", b3: "被写体の外観をそのまま保持" },
  },
  toolsSection: {
    title: "遺影写真ツール一覧",
    subtitle: "ツールを選んで遺影写真の編集を始めましょう",
    tools: {
      portrait: { title: "正装遺影生成", desc: "フォーマルな服装と背景の標準遺影" },
      colorize: { title: "白黒写真カラー化", desc: "白黒写真に自然な色を追加" },
      attire: { title: "服装変更", desc: "葬儀用フォーマル服装に変更" },
      background: { title: "背景編集", desc: "背景の除去・単色への置換" },
      composite: { title: "家族合成写真", desc: "複数写真を一枚の家族写真に" },
      poster: { title: "追悼ポスターデザイン", desc: "テキスト付きの格式あるポスター" },
    },
  },
  footer: { brand: "遺影写真編集", tagline: "AIによる尊厳ある遺影写真サービス", terms: "利用規約", privacy: "プライバシーポリシー", copyright: "© 2026 Funeral Photo Editing. All rights reserved." },
  cookieConsent: { message: "当サイトではCookieを使用しています。", accept: "同意する", learnMore: "詳細" },
  common: { loading: "読み込み中…", error: "エラーが発生しました。", success: "成功！", back: "戻る" },
};

const zhTW: TranslationKeys = {
  nav: { home: "首頁", edit: "編輯器", pricing: "方案", gallery: "我的相簿", signIn: "登入", signOut: "登出" },
  login: { welcomeToBrand: "歡迎使用遺照編輯", continueWithGoogle: "使用 Google 登入", redirecting: "跳轉中…", pleaseComplete: "請在彈出視窗中完成登入。", agreeTerms: "繼續即表示您同意我們的", and: "和", terms: "服務條款", privacyPolicy: "隱私政策" },
  home: {
    hero: { badge: "敬奉傳承，守護尊嚴", title: "有尊嚴的回憶，\n美麗地修復", subtitle: "賦予摯愛的遺產應有的敬意——將珍藏的照片化為永恆、莊嚴的紀念肖像。", cta: "開始追思紀念", uploadTitle: "上傳一張珍貴照片", uploadHint: "拖放或點擊上傳 — JPG、PNG（最大 10MB）", privacyNote: "照片不會被儲存或分享" },
    features: { title: "用心打造的永恆追思", subtitle: "每一項功能都為敬奉傳承、守護珍貴記憶而設計" },
    feature: {
      portrait: { title: "莊嚴遺照", desc: "為故人製作一張值得紀念、充滿敬意的正式遺照" },
      colorize: { title: "色彩重現", desc: "為珍貴的黑白家族老照片注入溫暖與生命力" },
      attire: { title: "端莊服裝", desc: "換上莊重的正式服裝，以配得上追思的莊嚴" },
      background: { title: "寧靜背景", desc: "乾淨、平靜的背景，讓所有目光聚焦於您所愛之人" },
      composite: { title: "家人團聚", desc: "將摯愛的家人合為一張永恆的家族合照——再次團聚" },
      poster: { title: "追思紀念品", desc: "一張美麗的紀念海報，用以分享和守護永恆的記憶" },
    },
    pricing: { title: "透明而溫暖的定價", subtitle: "一次性購買——無訂閱，無隱藏費用" },
    cta: { title: "準備好製作永恆的紀念了嗎？", subtitle: "用一張承載著愛、尊嚴與追憶的遺照，來紀念他們的一生。", button: "開始追思" },
  },
  pricing: {
    title: "選擇方案",
    subtitle: "一次性購買——隨時使用",
    basic: { name: "基礎版", price: "$0.99", desc: "適用於單張遺照", f1: "黑白正裝遺照 1 張", f2: "追思海報 1 張" },
    standard: { name: "標準版", price: "$9.99", desc: "多種格式與尺寸", f1: "多種尺寸海報", f2: "多張正裝照片", f3: "批次處理（各 10 張）" },
    premium: { name: "尊享版", price: "$39.99", desc: "全部功能，無限使用", f1: "包含所有功能", f2: "上色與服裝替換", f3: "背景編輯與合照合成", f4: "可列印高解析度輸出" },
    buy: "購買",
    popular: "最受歡迎",
  },
  edit: {
    title: "遺照編輯器",
    upload: "上傳照片",
    uploadHint: "拖放或點擊上傳（JPG、PNG，最大 10MB）",
    selectFunction: "選擇功能",
    portrait: "正裝遺照",
    colorize: "照片上色",
    attire: "更換服裝",
    background: "背景編輯",
    composite: "家族合照",
    poster: "追思海報",
    generate: "生成",
    generating: "處理中…",
    download: "下載",
    downloadHiRes: "下載高解析度",
    batchMode: "批次模式",
    batchHint: "上傳多張照片進行批次處理",
    noPermission: "您目前的方案不包含此功能，請升級。",
    loginRequired: "請先登入以使用編輯器。",
    result: "結果",
    original: "原圖",
    addMore: "新增更多照片",
    processing: "處理中",
    printSizes: "列印尺寸",
  },
  gallery: {
    title: "我的相簿",
    subtitle: "檢視所有已生成的遺照",
    empty: "尚無生成記錄。從編輯一張照片開始吧。",
    loading: "正在載入相簿…",
    loginRequired: "請先登入以檢視相簿。",
    download: "下載",
    type: "類型",
    date: "日期",
  },
  reviews: { title: "深受全球家庭信賴", subtitle: "使用過我們遺照服務的真實家庭故事" },
  featureSection: {
    badge: "服務內容",
    title: "專業遺照處理服務",
    portrait: { tag: "正裝遺照", title: "製作莊嚴的紀念肖像", desc: "將任何日常照片轉化為正式、莊重的遺照肖像，適用於葬禮和紀念場合。", b1: "標準肖像比例，專業構圖", b2: "自動搭配正式深色服裝", b3: "多種背景選項（藍、黑、白、灰）" },
    colorize: { tag: "照片上色", title: "為老照片重現色彩", desc: "運用AI上色技術為黑白遺照添加自然色彩，同時尊重原作的歷史感。", b1: "自然的膚色與服裝色彩", b2: "符合時代的精確色彩", b3: "保留原有質感與莊重感" },
    attire: { tag: "更換服裝", title: "莊重的服裝替換", desc: "將休閒服裝替換為適合紀念和葬禮場合的正式服裝。", b1: "與自然光線完美融合", b2: "深色西裝、正裝選項", b3: "面容和表情完全不變" },
    background: { tag: "背景編輯", title: "乾淨專業的背景", desc: "移除雜亂背景，替換為適合正式遺照的純色或漸層背景。", b1: "邊緣乾淨無瑕疵", b2: "純色或柔和漸層", b3: "完整保留主體外觀" },
  },
  toolsSection: {
    title: "所有遺照工具",
    subtitle: "選擇工具開始編輯您的遺照",
    tools: {
      portrait: { title: "正裝遺照生成", desc: "搭配正式服裝和背景的標準遺照" },
      colorize: { title: "黑白照片上色", desc: "為黑白照片添加自然色彩" },
      attire: { title: "服裝替換", desc: "替換為葬禮正式服裝" },
      background: { title: "背景編輯", desc: "移除或替換為純色背景" },
      composite: { title: "家族合照合成", desc: "多張照片合成一張家族照" },
      poster: { title: "追思海報設計", desc: "製作帶自訂文字的莊嚴海報" },
    },
  },
  footer: { brand: "遺照編輯", tagline: "AI 驅動的莊嚴遺照服務", terms: "服務條款", privacy: "隱私政策", copyright: "© 2026 Funeral Photo Editing. All rights reserved." },
  cookieConsent: { message: "我們使用 Cookie 來改善您的體驗。", accept: "接受", learnMore: "了解更多" },
  common: { loading: "載入中…", error: "發生錯誤。", success: "成功！", back: "返回" },
};

const translations: Record<string, TranslationKeys> = { en, ja, "zh-TW": zhTW };

export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  let obj: unknown = translations[locale] ?? translations.en;
  for (const k of keys) {
    if (obj && typeof obj === "object") {
      obj = (obj as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof obj === "string" ? obj : key;
}
