import type { Locale } from "./i18n";

export type TranslationKeys = {
  nav: { home: string; edit: string; pricing: string; gallery: string; cases: string; blog: string; signIn: string; signOut: string };
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
    guarantee: string;
    bestValue: string;
    basic: { name: string; headline: string; price: string; desc: string; f1: string; f2: string; f3: string; f4: string; f5: string };
    bundle: { name: string; headline: string; price: string; desc: string; f1: string; f2: string; f3: string; f4: string; f5: string; f6: string };
    legacy: { name: string; headline: string; price: string; desc: string; f1: string; f2: string; f3: string; f4: string };
    buy: string;
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
    wizard: {
      stepLabel: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
      step1Title: string;
      step2Title: string;
      step3Title: string;
      step4Title: string;
      faceTitle: string;
      faceDesc: string;
      lightingTitle: string;
      lightingDesc: string;
      qualityTitle: string;
      qualityDesc: string;
      continueUpload: string;
      uploadedAlt: string;
      autoScanReport: string;
      scanResolutionLow: string;
      scanResolutionGood: string;
      scanFileLarge: string;
      scanFileGood: string;
      scanRatioWarn: string;
      scanRatioGood: string;
      scanFailed: string;
      basicTitle: string;
      basicDesc: string;
      basicF1: string;
      basicF2: string;
      bundleTitle: string;
      bundleDesc: string;
      bundleF1: string;
      bundleF2: string;
      bundleF3: string;
      recommended: string;
      generateDeliverables: string;
      galleryEmpty: string;
      assetPortrait: string;
      assetPoster: string;
      assetCard: string;
      generationFailed: string;
      queued: string;
      delivered: string;
      downloadAll: string;
      statusPending: string;
      statusProcessing: string;
      statusDone: string;
      statusError: string;
    };
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
  cases: {
    badge: string; title: string; subtitle: string;
    caseLabel: string; portraitLabel: string; posterLabel: string; socialLabel: string;
    case1: { name: string; story: string };
    case2: { name: string; story: string };
    case3: { name: string; story: string };
    ctaTitle: string; ctaButton: string;
  };
  faq: {
    title: string; subtitle: string;
    q1: { q: string; a: string }; q2: { q: string; a: string }; q3: { q: string; a: string }; q4: { q: string; a: string };
    q5: { q: string; a: string }; q6: { q: string; a: string }; q7: { q: string; a: string }; q8: { q: string; a: string };
  };
  cookieConsent: { message: string; accept: string; learnMore: string };
  common: { loading: string; error: string; success: string; back: string };
};

const en: TranslationKeys = {
  nav: { home: "Home", edit: "Editor", pricing: "Pricing", gallery: "My Gallery", cases: "Cases", blog: "Blog", signIn: "Sign In", signOut: "Sign Out" },
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
    title: "Honor Their Memory with Dignity",
    subtitle: "One-time purchase — no subscriptions, no hidden fees. Results in minutes.",
    guarantee: "100% Money-back Guarantee",
    bestValue: "Best Value",
    basic: {
      name: "Basic Restoration", headline: "Dignified Essentials", price: "$19.99",
      desc: "One-time purchase",
      f1: "1× Identity-Preserving 8K Restoration",
      f2: "Formal Attire Addition (Suit / Dress)",
      f3: "Studio Gradient Background",
      f4: "Ready in 15 Minutes",
      f5: "100% Money-back Guarantee",
    },
    bundle: {
      name: "The Memorial Bundle", headline: "Complete Tribute Package", price: "$49.99",
      desc: "One-time purchase",
      f1: "Everything in Basic Restoration",
      f2: "Print-Ready Master File (large displays / headstones)",
      f3: "Digital Obituary Card (Social Media / WhatsApp)",
      f4: "Printable Memorial Booklet PDF Template",
      f5: "Lifetime Secure Cloud Storage",
      f6: "High-Priority Processing (Top of Queue)",
    },
    legacy: {
      name: "Legacy Collection", headline: "Eternal Heritage", price: "$99.99",
      desc: "One-time purchase",
      f1: "Restoration for up to 3 photos (Childhood, Prime, Recent)",
      f2: "1-on-1 AI Quality Audit by a Human Expert",
      f3: "All formats from the Bundle — for all 3 photos",
      f4: "VIP 24/7 Priority Support",
    },
    buy: "Purchase Now",
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
    wizard: {
      stepLabel: "Step",
      step1: "Image Pre-check",
      step2: "Upload & Auto-scan",
      step3: "Package Selection",
      step4: "Delivery Gallery",
      step1Title: "Step 1 — Image Pre-check Guidelines",
      step2Title: "Step 2 — Upload and Auto-scan",
      step3Title: "Step 3 — Package Selection",
      step4Title: "Step 4 — Unified Delivery Gallery",
      faceTitle: "Face Visibility",
      faceDesc: "Use photos with clear face details and minimal occlusion.",
      lightingTitle: "Lighting & Focus",
      lightingDesc: "Avoid severe blur and harsh backlight for best restoration quality.",
      qualityTitle: "Minimum Quality",
      qualityDesc: "Recommended 1200px+ on shorter side, JPG/PNG under 10MB.",
      continueUpload: "Continue to Upload",
      uploadedAlt: "Uploaded source",
      autoScanReport: "Auto-scan Report",
      scanResolutionLow: "Resolution is low. Recommended 1200px+ on the shortest side.",
      scanResolutionGood: "Resolution looks suitable for high-quality restoration.",
      scanFileLarge: "File is large. Processing may be slower.",
      scanFileGood: "File size is within optimal range.",
      scanRatioWarn: "Aspect ratio is very wide/narrow. Portrait crop may be needed.",
      scanRatioGood: "Aspect ratio is acceptable for memorial portrait output.",
      scanFailed: "Unable to inspect image metadata. Please try another file.",
      basicTitle: "Basic Package",
      basicDesc: "Portrait-focused restoration delivery.",
      basicF1: "Dignified Portrait",
      basicF2: "Formal attire + studio background",
      bundleTitle: "Full Bundle",
      bundleDesc: "Complete memorial delivery set.",
      bundleF1: "Portrait",
      bundleF2: "Poster",
      bundleF3: "Memorial Card (Social-ready)",
      recommended: "Recommended",
      generateDeliverables: "Generate Deliverables",
      galleryEmpty: "Your generated portrait/poster/card will appear here in a professional delivery grid.",
      assetPortrait: "Portrait",
      assetPoster: "Poster",
      assetCard: "Card",
      generationFailed: "Generation failed",
      queued: "Queued...",
      delivered: "Delivered",
      downloadAll: "Download All (Bundle)",
      statusPending: "Pending",
      statusProcessing: "Processing",
      statusDone: "Delivered",
      statusError: "Failed",
    },
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
  cases: {
    badge: "Case Studies", title: "Memorial Photo Portfolios", subtitle: "Complete memorial sets — formal portraits, posters, and social media tributes",
    caseLabel: "Case", portraitLabel: "Formal Portrait", posterLabel: "Memorial Poster", socialLabel: "Social Media",
    case1: { name: "The Yamamoto Family", story: "A treasured 1960s photograph of Mr. Yamamoto was transformed into a complete memorial set — a dignified formal portrait, a commemorative poster, and social media tributes for family abroad." },
    case2: { name: "The Chen Family", story: "Mrs. Chen's casual garden photo became the centerpiece of her memorial. AI colorization brought warmth to the vintage black & white original, and formal attire was applied with grace." },
    case3: { name: "The Williams Family", story: "Multiple family snapshots were composited into a single, timeless portrait uniting three generations — accompanied by a memorial poster and online sharing formats." },
    ctaTitle: "Create Your Family's Memorial", ctaButton: "Start Editing Now",
  },
  faq: {
    title: "Frequently Asked Questions", subtitle: "Everything you need to know about our memorial photo services",
    q1: { q: "How does the AI memorial photo editing work?", a: "Our AI analyzes your uploaded photo and applies professional-grade editing — from generating formal portraits with appropriate attire to colorizing vintage black & white images. The entire process takes just seconds, with results you can download instantly." },
    q2: { q: "What photo formats and sizes are supported?", a: "We accept JPG and PNG images up to 10 MB. Output images are available in multiple sizes suitable for printing (4×6, 5×7, 8×10, A4) as well as web and social media formats." },
    q3: { q: "Is my photo data kept private and secure?", a: "Absolutely. Your photos are processed in real-time and never stored on our servers after generation. We do not share, sell, or use your images for any purpose other than the service you requested." },
    q4: { q: "Can I edit a very old or damaged photograph?", a: "Yes. Our AI is trained to handle low-resolution, faded, and damaged photos. While severely damaged images may have some limitations, most vintage photos produce excellent results with colorization and formal portrait generation." },
    q5: { q: "What's included in each pricing tier?", a: "Basic Restoration ($19.99): 1 identity-preserving 8K restoration with formal attire and studio background. The Memorial Bundle ($49.99): Everything in Basic plus print-ready master files, digital obituary card, memorial booklet template, and lifetime cloud storage. Legacy Collection ($99.99): Up to 3 photo restorations with human expert audit and VIP support." },
    q6: { q: "How do I get a print-ready memorial photo?", a: "After generating your memorial photo, you can download it in specific print sizes (4×6, 5×7, 8×10, A4). These are exported at 300 DPI — the industry standard for high-quality photo printing." },
    q7: { q: "Can I create a family composite from separate photos?", a: "Yes. With the Premium plan, you can upload multiple individual photos and our AI will combine them into a single, natural-looking family portrait — perfect for when no group photo exists." },
    q8: { q: "Do you support languages other than English?", a: "Yes. Our interface is available in English, Japanese (日本語), and Traditional Chinese (繁體中文). You can switch languages anytime using the language selector in the navigation bar." },
  },
  footer: { brand: "Funeral Photo Editing", tagline: "Dignified memorial photo services powered by AI", terms: "Terms of Service", privacy: "Privacy Policy", copyright: "© 2026 Funeral Photo Editing. All rights reserved." },
  cookieConsent: { message: "We use cookies to improve your experience.", accept: "Accept", learnMore: "Learn More" },
  common: { loading: "Loading…", error: "An error occurred.", success: "Success!", back: "Back" },
};

const ja: TranslationKeys = {
  nav: { home: "ホーム", edit: "エディタ", pricing: "料金", gallery: "マイギャラリー", cases: "事例", blog: "ブログ", signIn: "ログイン", signOut: "ログアウト" },
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
    title: "尊厳をもって、その思い出を称える",
    subtitle: "一回限りの購入——サブスク不要、隠れた費用なし。数分で完成。",
    guarantee: "100%返金保証",
    bestValue: "お得なプラン",
    basic: {
      name: "ベーシック修復", headline: "格式ある必需品", price: "$19.99",
      desc: "一回限りの購入",
      f1: "本人の特徴を保持した8K修復 1回",
      f2: "正装の自動追加（スーツ／ドレス）",
      f3: "スタジオ品質のグラデーション背景",
      f4: "15分以内に完成",
      f5: "100%返金保証",
    },
    bundle: {
      name: "メモリアルバンドル", headline: "完全追悼パッケージ", price: "$49.99",
      desc: "一回限りの購入",
      f1: "ベーシック修復の全内容を含む",
      f2: "印刷用マスターファイル（大型展示・墓石用）",
      f3: "デジタル訃報カード（SNS・WhatsApp対応）",
      f4: "印刷可能なメモリアルブックレットPDFテンプレート",
      f5: "永久セキュアクラウド保存",
      f6: "優先処理（キューの最上位）",
    },
    legacy: {
      name: "レガシーコレクション", headline: "永遠の遺産", price: "$99.99",
      desc: "一回限りの購入",
      f1: "最大3枚の写真を修復（幼少期・壮年期・近影）",
      f2: "人間の専門家による1対1のAI品質監査",
      f3: "バンドルの全フォーマット——3枚すべてに適用",
      f4: "VIP 24時間365日優先サポート",
    },
    buy: "今すぐ購入",
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
    wizard: {
      stepLabel: "ステップ",
      step1: "画像事前チェック",
      step2: "アップロードと自動スキャン",
      step3: "パッケージ選択",
      step4: "納品ギャラリー",
      step1Title: "ステップ1 — 画像事前チェックガイド",
      step2Title: "ステップ2 — アップロードと自動スキャン",
      step3Title: "ステップ3 — パッケージ選択",
      step4Title: "ステップ4 — 統合納品ギャラリー",
      faceTitle: "顔の視認性",
      faceDesc: "顔がはっきり見える写真を使用してください。",
      lightingTitle: "明るさとピント",
      lightingDesc: "強い逆光や大きなブレは避けてください。",
      qualityTitle: "推奨品質",
      qualityDesc: "短辺1200px以上、JPG/PNG、10MB以下を推奨。",
      continueUpload: "アップロードへ進む",
      uploadedAlt: "アップロード画像",
      autoScanReport: "自動スキャン結果",
      scanResolutionLow: "解像度が低めです。短辺1200px以上を推奨します。",
      scanResolutionGood: "解像度は高品質処理に適しています。",
      scanFileLarge: "ファイルサイズが大きめです。処理に時間がかかる場合があります。",
      scanFileGood: "ファイルサイズは適切です。",
      scanRatioWarn: "縦横比が極端です。ポートレート用にトリミングされる可能性があります。",
      scanRatioGood: "縦横比は遺影出力に適しています。",
      scanFailed: "画像情報を解析できませんでした。別の画像をお試しください。",
      basicTitle: "ベーシックパッケージ",
      basicDesc: "遺影ポートレート中心の納品。",
      basicF1: "格式ある遺影ポートレート",
      basicF2: "正装 + スタジオ背景",
      bundleTitle: "フルバンドル",
      bundleDesc: "追悼に必要な完全納品セット。",
      bundleF1: "ポートレート",
      bundleF2: "ポスター",
      bundleF3: "メモリアルカード（SNS向け）",
      recommended: "おすすめ",
      generateDeliverables: "納品物を生成",
      galleryEmpty: "生成されたポートレート／ポスター／カードがここに表示されます。",
      assetPortrait: "ポートレート",
      assetPoster: "ポスター",
      assetCard: "カード",
      generationFailed: "生成に失敗しました",
      queued: "待機中...",
      delivered: "納品済み",
      downloadAll: "すべてダウンロード（バンドル）",
      statusPending: "待機中",
      statusProcessing: "処理中",
      statusDone: "納品済み",
      statusError: "失敗",
    },
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
  cases: {
    badge: "導入事例", title: "遺影写真ポートフォリオ", subtitle: "正装遺影、追悼ポスター、SNS用画像の完全セット",
    caseLabel: "事例", portraitLabel: "正装遺影", posterLabel: "追悼ポスター", socialLabel: "SNS共有用",
    case1: { name: "山本家", story: "1960年代の大切なお写真が完全な遺影セットに。格式ある正装遺影、記念ポスター、そして遠方のご家族向けのSNS用画像を作成しました。" },
    case2: { name: "陳家", story: "陳さんのお庭での何気ない写真がメモリアルの中心に。AIカラー化により白黒の原画に温かみを取り戻し、品格ある正装を自然に合成しました。" },
    case3: { name: "ウィリアムズ家", story: "複数の家族スナップを合成し、三世代が一堂に会す永遠の家族写真に。追悼ポスターとオンライン共有用フォーマットも併せて作成しました。" },
    ctaTitle: "ご家族の追悼を形に", ctaButton: "編集を始める",
  },
  faq: {
    title: "よくあるご質問", subtitle: "遺影写真サービスについてのご案内",
    q1: { q: "AIによる遺影写真編集はどのように行われますか？", a: "アップロードされたお写真をAIが分析し、正装遺影の生成や白黒写真のカラー化など、プロ品質の編集を行います。処理はわずか数秒で完了し、すぐにダウンロードいただけます。" },
    q2: { q: "対応している画像形式とサイズは？", a: "JPGとPNG形式で最大10MBまでの画像に対応しています。出力画像は印刷用（4×6、5×7、8×10、A4）やウェブ・SNS用の複数サイズでダウンロード可能です。" },
    q3: { q: "写真データのプライバシーは守られますか？", a: "もちろんです。お写真はリアルタイムで処理され、生成後にサーバーに保存されることはありません。お客様の画像を共有・販売・他の目的に使用することは一切ありません。" },
    q4: { q: "非常に古い写真や傷んだ写真も編集できますか？", a: "はい。当AIは低解像度、色褪せ、傷みのある写真にも対応しています。ひどく損傷した画像には制約がある場合もありますが、ほとんどのヴィンテージ写真で優れた結果が得られます。" },
    q5: { q: "各料金プランには何が含まれますか？", a: "ベーシック修復（$19.99）：本人の特徴を保持した8K修復1回、正装追加、スタジオ背景。メモリアルバンドル（$49.99）：ベーシックの全内容＋印刷用マスターファイル、訃報カード、ブックレットテンプレート、永久クラウド保存。レガシーコレクション（$99.99）：最大3枚修復、専門家監査、VIPサポート。" },
    q6: { q: "印刷用の遺影写真はどうやって入手しますか？", a: "遺影写真を生成した後、特定の印刷サイズ（4×6、5×7、8×10、A4）でダウンロードできます。出力は300DPI — 高品質写真印刷の業界標準です。" },
    q7: { q: "別々の写真から家族合成写真を作れますか？", a: "はい。プレミアムプランでは、複数の個別写真をアップロードし、AIが自然な家族写真に合成します。集合写真がない場合に最適です。" },
    q8: { q: "英語以外の言語に対応していますか？", a: "はい。英語、日本語、繁体字中国語に対応しています。ナビゲーションバーの言語セレクターからいつでも切り替えられます。" },
  },
  footer: { brand: "遺影写真編集", tagline: "AIによる尊厳ある遺影写真サービス", terms: "利用規約", privacy: "プライバシーポリシー", copyright: "© 2026 Funeral Photo Editing. All rights reserved." },
  cookieConsent: { message: "当サイトではCookieを使用しています。", accept: "同意する", learnMore: "詳細" },
  common: { loading: "読み込み中…", error: "エラーが発生しました。", success: "成功！", back: "戻る" },
};

const zhTW: TranslationKeys = {
  nav: { home: "首頁", edit: "編輯器", pricing: "方案", gallery: "我的相簿", cases: "案例", blog: "部落格", signIn: "登入", signOut: "登出" },
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
    title: "以尊嚴紀念他們的一生",
    subtitle: "一次性購買——無訂閱、無隱藏費用。數分鐘內完成。",
    guarantee: "100% 退款保證",
    bestValue: "最佳方案",
    basic: {
      name: "基礎修復", headline: "莊嚴必備", price: "$19.99",
      desc: "一次性購買",
      f1: "1 次保留本人特徵的 8K 修復",
      f2: "自動添加正式服裝（西裝／洋裝）",
      f3: "專業棚拍漸層背景",
      f4: "15 分鐘內完成",
      f5: "100% 退款保證",
    },
    bundle: {
      name: "追思紀念套組", headline: "完整追悼方案", price: "$49.99",
      desc: "一次性購買",
      f1: "包含基礎修復的所有內容",
      f2: "可列印主檔（大型展示／墓碑用）",
      f3: "數位訃告卡（社群媒體／WhatsApp）",
      f4: "可列印追思手冊 PDF 模板",
      f5: "終身安全雲端儲存",
      f6: "優先處理（排隊最前）",
    },
    legacy: {
      name: "傳承典藏", headline: "永恆遺產", price: "$99.99",
      desc: "一次性購買",
      f1: "最多修復 3 張照片（童年、壯年、近照）",
      f2: "人工專家一對一 AI 品質審核",
      f3: "套組的所有格式——適用於全部 3 張照片",
      f4: "VIP 全天候優先支援",
    },
    buy: "立即購買",
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
    wizard: {
      stepLabel: "步驟",
      step1: "圖片預檢",
      step2: "上傳與自動掃描",
      step3: "方案選擇",
      step4: "交付圖庫",
      step1Title: "步驟 1 — 圖片預檢指引",
      step2Title: "步驟 2 — 上傳與自動掃描",
      step3Title: "步驟 3 — 方案選擇",
      step4Title: "步驟 4 — 統一交付圖庫",
      faceTitle: "臉部清晰度",
      faceDesc: "請使用臉部清楚、遮擋較少的照片。",
      lightingTitle: "光線與對焦",
      lightingDesc: "避免嚴重模糊與強烈逆光。",
      qualityTitle: "最低建議品質",
      qualityDesc: "建議短邊 1200px 以上，JPG/PNG 且小於 10MB。",
      continueUpload: "繼續上傳",
      uploadedAlt: "已上傳來源圖",
      autoScanReport: "自動掃描報告",
      scanResolutionLow: "解析度偏低，建議短邊至少 1200px。",
      scanResolutionGood: "解析度適合高品質修復。",
      scanFileLarge: "檔案較大，處理時間可能較長。",
      scanFileGood: "檔案大小在最佳範圍內。",
      scanRatioWarn: "長寬比偏極端，可能需要人像裁切。",
      scanRatioGood: "長寬比適合遺照輸出。",
      scanFailed: "無法分析圖片資訊，請嘗試其他檔案。",
      basicTitle: "基礎方案",
      basicDesc: "以遺照肖像為主的交付。",
      basicF1: "莊嚴遺照肖像",
      basicF2: "正裝 + 棚拍背景",
      bundleTitle: "完整套組",
      bundleDesc: "完整追思交付內容。",
      bundleF1: "肖像",
      bundleF2: "海報",
      bundleF3: "紀念卡（社群適配）",
      recommended: "推薦",
      generateDeliverables: "生成交付素材",
      galleryEmpty: "生成後的肖像／海報／卡片將在這裡以專業網格顯示。",
      assetPortrait: "肖像",
      assetPoster: "海報",
      assetCard: "卡片",
      generationFailed: "生成失敗",
      queued: "排隊中...",
      delivered: "已交付",
      downloadAll: "全部下載（套組）",
      statusPending: "待處理",
      statusProcessing: "處理中",
      statusDone: "已交付",
      statusError: "失敗",
    },
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
  cases: {
    badge: "案例展示", title: "遺照作品集", subtitle: "完整的紀念套組——正裝遺照、追思海報與社群分享",
    caseLabel: "案例", portraitLabel: "正裝遺照", posterLabel: "追思海報", socialLabel: "社群分享",
    case1: { name: "山本家族", story: "一張1960年代珍貴的老照片被轉化為完整的紀念套組——莊嚴的正裝遺照、紀念海報，以及供海外親友使用的社群分享圖片。" },
    case2: { name: "陳家", story: "陳女士在花園中的日常照片成為追思會的焦點。AI上色技術為黑白原照注入溫暖，並優雅地搭配上正式服裝。" },
    case3: { name: "威廉斯家族", story: "多張家庭快照合成為一張跨越三代的永恆家族肖像——同時附上追思海報與線上分享格式。" },
    ctaTitle: "為您的家人製作紀念作品", ctaButton: "立即開始編輯",
  },
  faq: {
    title: "常見問題", subtitle: "關於我們遺照服務的一切資訊",
    q1: { q: "AI 遺照編輯是如何運作的？", a: "我們的 AI 會分析您上傳的照片，並進行專業級編輯——從生成搭配正式服裝的遺照肖像，到為老舊黑白照片上色。整個過程只需幾秒鐘，結果可以立即下載。" },
    q2: { q: "支援哪些圖片格式和尺寸？", a: "我們接受 JPG 和 PNG 格式，最大 10 MB。輸出圖片提供多種尺寸，適用於列印（4×6、5×7、8×10、A4）以及網頁和社群媒體。" },
    q3: { q: "我的照片資料是否安全保密？", a: "絕對是。您的照片會即時處理，生成後不會儲存在我們的伺服器上。我們不會分享、出售或將您的圖片用於任何其他目的。" },
    q4: { q: "可以編輯非常老舊或損壞的照片嗎？", a: "可以。我們的 AI 經過訓練，能處理低解析度、褪色和受損的照片。雖然嚴重損壞的圖片可能有些限制，但大多數老照片在上色和遺照生成方面都能獲得出色的效果。" },
    q5: { q: "每個方案包含什麼？", a: "基礎修復（$19.99）：1 次保留本人特徵的 8K 修復，含正裝和棚拍背景。追思紀念套組（$49.99）：基礎修復全部內容，加上可列印主檔、數位訃告卡、追思手冊模板和終身雲端儲存。傳承典藏（$99.99）：最多 3 張照片修復、人工專家審核和 VIP 支援。" },
    q6: { q: "如何取得可列印的遺照？", a: "生成遺照後，您可以選擇特定列印尺寸（4×6、5×7、8×10、A4）下載。輸出為 300 DPI——高品質照片列印的業界標準。" },
    q7: { q: "可以用不同的照片合成家族合照嗎？", a: "可以。尊享版方案允許您上傳多張個人照片，AI 會將它們合成為一張自然的家族肖像——非常適合沒有合照的情況。" },
    q8: { q: "是否支援英語以外的語言？", a: "是的。我們的介面支援英語、日語（日本語）和繁體中文。您可以隨時使用導覽列中的語言選擇器切換語言。" },
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
