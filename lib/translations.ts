import type { Locale } from "./i18n";

export type TranslationKeys = {
  nav: { home: string; edit: string; pricing: string; gallery: string; signIn: string; signOut: string };
  login: { welcomeToBrand: string; continueWithGoogle: string; redirecting: string; pleaseComplete: string; agreeTerms: string; and: string; terms: string; privacyPolicy: string };
  home: {
    hero: { title: string; subtitle: string; cta: string };
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
  cookieConsent: { message: string; accept: string; learnMore: string };
  common: { loading: string; error: string; success: string; back: string };
};

const en: TranslationKeys = {
  nav: { home: "Home", edit: "Editor", pricing: "Pricing", gallery: "My Gallery", signIn: "Sign In", signOut: "Sign Out" },
  login: { welcomeToBrand: "Welcome to Funeral Photo Editing", continueWithGoogle: "Continue with Google", redirecting: "Redirecting…", pleaseComplete: "Please complete sign-in in the popup.", agreeTerms: "By continuing, you agree to our ", and: " and ", terms: "Terms of Service", privacyPolicy: "Privacy Policy" },
  home: {
    hero: { title: "Honor Their Memory with Dignity", subtitle: "Professional AI-powered memorial photo editing — create formal portraits, colorize vintage photos, and generate memorial posters with the respect they deserve.", cta: "Start Editing" },
    features: { title: "Complete Memorial Photo Services", subtitle: "Everything you need to prepare dignified memorial photographs" },
    feature: {
      portrait: { title: "Formal Portrait", desc: "Generate standard memorial portraits with formal attire and professional backgrounds" },
      colorize: { title: "Photo Colorization", desc: "Bring vintage black & white memorial photos to life with natural colors" },
      attire: { title: "Attire Replacement", desc: "Replace clothing with formal black suits or traditional attire" },
      background: { title: "Background Editing", desc: "Remove or replace backgrounds with solid colors or gradient effects" },
      composite: { title: "Family Composite", desc: "Combine multiple photos into a single dignified family portrait" },
      poster: { title: "Memorial Poster", desc: "Create beautiful memorial posters with customizable text and layouts" },
    },
    pricing: { title: "Simple, Transparent Pricing", subtitle: "One-time purchase — no subscriptions, no hidden fees" },
    cta: { title: "Ready to Create a Lasting Tribute?", subtitle: "Upload a photo and let our AI help you create the perfect memorial image.", button: "Get Started Now" },
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
  footer: { brand: "Funeral Photo Editing", tagline: "Dignified memorial photo services powered by AI", terms: "Terms of Service", privacy: "Privacy Policy", copyright: "© 2026 Funeral Photo Editing. All rights reserved." },
  cookieConsent: { message: "We use cookies to improve your experience.", accept: "Accept", learnMore: "Learn More" },
  common: { loading: "Loading…", error: "An error occurred.", success: "Success!", back: "Back" },
};

const ja: TranslationKeys = {
  nav: { home: "ホーム", edit: "エディタ", pricing: "料金", gallery: "マイギャラリー", signIn: "ログイン", signOut: "ログアウト" },
  login: { welcomeToBrand: "遺影写真編集へようこそ", continueWithGoogle: "Googleでログイン", redirecting: "リダイレクト中…", pleaseComplete: "ポップアップでログインを完了してください。", agreeTerms: "続行することで、", and: "および", terms: "利用規約", privacyPolicy: "プライバシーポリシー" },
  home: {
    hero: { title: "尊厳をもって故人を偲ぶ", subtitle: "AIによるプロフェッショナルな遺影写真編集——正装ポートレートの作成、ヴィンテージ写真のカラー化、追悼ポスターの生成を、敬意を込めて。", cta: "編集を始める" },
    features: { title: "遺影写真の総合サービス", subtitle: "尊厳ある遺影写真の準備に必要なすべて" },
    feature: {
      portrait: { title: "正装遺影", desc: "正式な服装とプロフェッショナルな背景で標準的な遺影を生成" },
      colorize: { title: "写真カラー化", desc: "白黒の遺影写真を自然な色彩で蘇らせます" },
      attire: { title: "服装変更", desc: "衣服を黒のフォーマルスーツや伝統的な正装に変更" },
      background: { title: "背景編集", desc: "背景の除去や単色・グラデーションへの置き換え" },
      composite: { title: "家族合成写真", desc: "複数の写真を一枚の格式ある家族写真に合成" },
      poster: { title: "追悼ポスター", desc: "カスタマイズ可能なテキストとレイアウトで美しい追悼ポスターを作成" },
    },
    pricing: { title: "シンプルで明確な料金", subtitle: "一回限りの購入——サブスクリプション不要、隠れた費用なし" },
    cta: { title: "永遠の追悼を作成する準備はできましたか？", subtitle: "写真をアップロードして、AIが完璧な遺影画像の作成をお手伝いします。", button: "今すぐ始める" },
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
  footer: { brand: "遺影写真編集", tagline: "AIによる尊厳ある遺影写真サービス", terms: "利用規約", privacy: "プライバシーポリシー", copyright: "© 2026 Funeral Photo Editing. All rights reserved." },
  cookieConsent: { message: "当サイトではCookieを使用しています。", accept: "同意する", learnMore: "詳細" },
  common: { loading: "読み込み中…", error: "エラーが発生しました。", success: "成功！", back: "戻る" },
};

const zhTW: TranslationKeys = {
  nav: { home: "首頁", edit: "編輯器", pricing: "方案", gallery: "我的相簿", signIn: "登入", signOut: "登出" },
  login: { welcomeToBrand: "歡迎使用遺照編輯", continueWithGoogle: "使用 Google 登入", redirecting: "跳轉中…", pleaseComplete: "請在彈出視窗中完成登入。", agreeTerms: "繼續即表示您同意我們的", and: "和", terms: "服務條款", privacyPolicy: "隱私政策" },
  home: {
    hero: { title: "以尊嚴紀念逝者", subtitle: "AI 驅動的專業遺照編輯——製作正裝肖像、為老照片上色、生成追思海報，以最崇敬的方式紀念故人。", cta: "開始編輯" },
    features: { title: "全方位遺照服務", subtitle: "準備莊嚴遺照所需的一切功能" },
    feature: {
      portrait: { title: "正裝遺照", desc: "生成標準的正裝遺照，搭配專業背景" },
      colorize: { title: "照片上色", desc: "為黑白遺照添加自然色彩，重現往日風采" },
      attire: { title: "更換服裝", desc: "將服裝替換為黑色正裝或傳統禮服" },
      background: { title: "背景編輯", desc: "去除或替換背景為純色或漸變效果" },
      composite: { title: "家族合照", desc: "將多張照片合成為一張莊嚴的家族合照" },
      poster: { title: "追思海報", desc: "製作精美的追思海報，支援自訂文字和版面" },
    },
    pricing: { title: "簡單透明的定價", subtitle: "一次性購買——無訂閱，無隱藏費用" },
    cta: { title: "準備好製作永恆的紀念了嗎？", subtitle: "上傳照片，讓 AI 協助您製作完美的遺照。", button: "立即開始" },
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
