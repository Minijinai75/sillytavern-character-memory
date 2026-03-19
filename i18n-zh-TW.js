/**
 * CharMemory 繁體中文翻譯
 * Traditional Chinese (zh-TW) translation for CharMemory
 */

const CharMemory_i18n_zhTW = {
    // 統計欄位
    stats: {
        noCharacter: '沒有角色',
        memories: (count) => `${count} 個記憶`,
        messages: (current, total) => `${current}/${total} 則訊息`,
        ready: '就緒',
    },

    // 按鈕
    buttons: {
        extractNow: '立即提取',
        auto: '自動',
        viewEdit: '檢視 / 編輯',
        dataBank: '資料庫',
        consolidate: '整合',
        batch: '批次處理',
        reformat: '重新格式化',
        save: '儲存',
        cancel: '取消',
        undo: '復原',
        rerun: '重新執行',
        connect: '連接',
        testModel: '測試模型',
        testConnection: '測試連接',
        next: '下一步',
        back: '返回',
        getStarted: '開始使用',
        keepMine: '保留我的',
        useNewDefault: '使用新預設',
        compareEdit: '比較並編輯',
        restoreDefault: '恢復預設',
        doneComparing: '完成比較',
        convertNow: '立即轉換',
        skip: '跳過，稍後再做',
        resetThisChat: '重設此對話',
        resetBatchProgress: '重設批次進度',
        clearAllMemories: '清除所有記憶',
        addMemory: '新增記憶',
        addBlock: '新增區塊',
        viewFullLog: '查看完整日誌',
        viewDetails: '查看詳情',
    },

    // 成功訊息
    success: {
        reformatted: (count) => `已重新格式化 ${count} 個記憶。`,
        converted: (count, fileName) => `已將 ${count} 個記憶轉換至 ${fileName}。請記得隱藏或移除原始檔案。`,
        memoriesSaved: (count, chunks) => `已從 ${chunks} 個區塊儲存 ${count} 個記憶。`,
        promptSaved: '提示已儲存。',
        promptRestored: '提示已恢復為預設值。',
        promptUpdated: '提示已更新為新預設值。',
        clickExtractNow: '點擊面板中的<b>立即提取</b>以提取您的第一批記憶...',
        saved: (count, name) => `已儲存 ${count} 個記憶到 ${name}。`,
        downloaded: (name) => `已下載：${name}`,
        deleted: (name) => `已刪除：${name}`,
        imported: (name) => `已匯入：${name}`,
        replaced: (count) => `已替換 ${count} 處。`,
        consolidationUndone: '整合已復原。記憶已恢復。',
        consolidated: (before, after) => `已整合 ${before} → ${after} 個記憶。`,
        reformattedCount: (before, after) => `已重新格式化 ${before} → ${after} 個記憶。`,
        batchCleared: (count) => `已清除 ${count} 個對話的批次進度。`,
        memoriesCleared: '已清除所有對話的記憶並重設提取狀態...',
        pinned: (count) => `已固定 ${count} 個記憶！`,
    },

    // 錯誤訊息
    errors: {
        couldNotReadFile: '無法讀取選定的檔案。',
        conversionFailed: (msg) => `轉換失敗：${msg || '未知錯誤'}`,
        rerunFailed: (msg) => `重新執行失敗：${msg || '未知錯誤'}`,
        noCharacterSelected: '未選擇角色。',
        webllmNotAvailable: '此瀏覽器不支援 WebLLM。',
        extractionFailed: '記憶提取失敗。請查看控制台以獲取詳細資訊。',
        couldNotExport: '無法匯出檔案。',
        couldNotDelete: '無法刪除檔案。',
        couldNotImport: '無法匯入檔案。',
        couldNotCopyReport: '無法將報告複製到剪貼簿。',
        consolidationFailed: '記憶整合失敗。請查看控制台以獲取詳細資訊。',
        reformatFailed: (msg) => `重新格式化失敗：${msg || '未知錯誤'}`,
        failedToSave: '無法儲存重新格式化的記憶。',
    },

    // 警告訊息
    warnings: {
        apiCallInProgress: 'API 調用正在進行中。',
        selectSourceFile: '請先選擇來源檔案。',
        noMemoriesExtracted: '無法從檔案中提取記憶。',
        noMemoriesToSave: '沒有要儲存的記憶。',
        enterFilename: '請輸入自訂輸出的檔案名稱。',
        extractionStopped: (processed, total) => `提取在處理了 ${processed}/${total} 個區塊後停止。`,
        fileEmpty: '檔案為空或無法讀取。',
        noConsolidationToUndo: '沒有要復原的整合。',
        consolidationCancelled: '整合已取消。',
        cannotSaveWhileRerun: '重新執行進行中時無法儲存。',
        memoriesUnchanged: '沒有要儲存的記憶。記憶未變更。',
        noReformatToUndo: '沒有要復原的重新格式化。',
        messageHasNoText: '訊息沒有文字內容。',
    },

    // 資訊訊息
    info: {
        sendingToLLM: '發送到 LLM 進行重組...',
        noUnprocessedMessages: '沒有未處理的訊息。使用「重設提取狀態」...',
        noNewMessages: '沒有新訊息要提取。',
        extracting: (stepInfo, sourceLabel) => `正在為 ${stepInfo} 通過 ${sourceLabel} 提取...`,
        extractingVia: (sourceLabel, chunkInfo) => `正在通過 ${sourceLabel}${chunkInfo} 提取...`,
        noNewMemories: '未找到新記憶。',
        notificationDismissed: '通知已關閉。您的自訂提示未變更。',
        openChat: '開啟與角色的對話，然後點擊<b>立即提取</b>...',
        consolidating: (sourceLabel) => `正在通過 ${sourceLabel} 整合...`,
        notEnoughMemories: '記憶不足以進行整合。',
        noMemoriesToReformat: '未找到要重新格式化的記憶。',
        sendingForReformat: (sourceLabel) => `正在發送到 ${sourceLabel} 進行重新格式化...`,
        reformatCancelled: '重新格式化已取消。',
        reformatUndone: '重新格式化已復原 — 原始記憶已恢復。',
        diagnosticsCaptured: '診斷已捕獲。請查看控制台和診斷面板。',
        noBatchProgress: '沒有批次進度要清除。',
        activityLogEmpty: '活動日誌為空。',
    },

    // 標籤
    labels: {
        setupWizard: '設定精靈',
        troubleshooter: '疑難排解',
        openSettings: '開啟設定',
        toggleInjectionViewer: '切換注入檢視器',
        needsAttention: '需要注意',
        dataBankTools: '資料庫工具',
        activity: '活動',
        diagnostics: '診斷',
        noActivityYet: '尚無活動。',
        noDiagnosticsYet: '尚無診斷資訊。',
        file: '檔案',
        memoriesCount: '記憶',
        progress: '進度',
        status: '狀態',
        healthDot: '健康狀態',
    },

    // 提示文字
    tooltips: {
        dataBankFile: '儲存此角色記憶的資料庫檔案',
        totalMemories: '儲存的個別記憶項目總數',
        newMessages: '自上次提取以來的新訊息數 / 自動提取閾值',
        timeRemaining: '下次自動提取允許前的剩餘時間',
        injectionHealth: '注入健康狀態 — 點擊查看詳情',
        extractNow: '從未處理的訊息中提取記憶。如果所有訊息都已處理，請先使用「重設提取狀態」從頭重新讀取。',
        autoExtract: '切換自動提取 — 開啟時，在設定數量的新訊息後自動提取記憶',
        viewEdit: '瀏覽、編輯和刪除個別儲存的記憶',
        dataBank: '瀏覽和管理此角色的資料庫檔案',
        consolidate: '使用 LLM 合併重複和相關的記憶',
        batch: '一次對多個聊天執行提取',
        reformat: '重新格式化記憶檔案結構以獲得更好的檢索效果',
    },

    // 對話框
    dialogs: {
        editMemory: '編輯文字以儲存為記憶：',
        undoConsolidation: '復原上次整合並恢復先前的記憶？',
        selectCharacterView: '選擇角色以檢視/編輯記憶：',
        selectCharacterConsolidate: '選擇角色以整合記憶：',
        selectCharacterReformat: '選擇角色以重新格式化記憶：',
        noMemoriesYet: '尚無記憶。',
        originalFile: '原始檔案',
        convertedMemories: '已轉換的記憶',
        originalNotDeleted: '原始檔案<b>不會</b>被刪除...',
        outputTo: '輸出至：',
        charMemoryFile: 'CharMemory 檔案',
    },

    // 注入檢視器
    injectionViewer: {
        noInjectionData: '此訊息沒有記錄注入資料。',
        context: '上下文',
        loading: '載入中...',
        noMemoriesMatched: '此訊息沒有匹配的記憶...',
        duplicatesDetected: (count) => `偵測到 ${count} 個重複的記憶...`,
        dataBank: '資料庫',
        noMemoriesInjected: '沒有注入的記憶',
        lorebookEntries: '知識書條目',
        noLorebookEntries: '沒有啟動的知識書條目',
        extensionPrompts: '擴充提示',
        noExtensionPrompts: '沒有啟動的擴充提示',
    },

    // 提供商
    providers: {
        openai: 'OpenAI',
        anthropic: 'Anthropic',
        openrouter: 'OpenRouter',
        groq: 'Groq',
        deepseek: 'DeepSeek',
        mistral: 'Mistral',
        xai: 'xAI (Grok)',
        nanogpt: 'NanoGPT',
        localServer: '本地伺服器 (Ollama / KoboldCpp / llama.cpp / LM Studio)',
        nvidia: 'NVIDIA',
        pollinations: 'Pollinations (免費)',
        custom: '自訂 (OpenAI 相容)',
    },

    // 連接類型
    connectionTypes: {
        dedicatedApi: '專用 API（推薦）',
        connectionProfile: '連接配置文件',
        webllm: 'WebLLM（瀏覽器本地）',
        mainLLM: '主 LLM',
    },

    // 設定
    settings: {
        provider: '提供商',
        apiKey: 'API 金鑰',
        baseUrl: '基礎 URL',
        model: '模型',
        extractionInterval: '提取間隔',
        blockLevel: '區塊級別（預設）',
        bulletLevel: '項目級別',
        custom: '自訂',
    },

    // Placeholder
    placeholders: {
        enterApiKey: '輸入 API 金鑰',
        searchModels: '搜尋模型...',
        clickConnect: '點擊連接以獲取模型',
        enterModel: '輸入模型識別碼',
        overridePrompt: '覆蓋預設系統提示。留空則使用預設值。',
        autoGenerated: '（從角色名稱自動生成）',
        editPrompt: '編輯此策略的提示...',
        find: '尋找...',
        replaceWith: '替換為...',
    },
};

// 自動應用翻譯（當 DOM 載入完成時）
if (typeof window !== 'undefined') {
    // 導出翻譯對象供其他模組使用
    window.CharMemory_i18n = CharMemory_i18n_zhTW;

    // 可以在這裡添加自動替換 DOM 文字的邏輯
    console.log('CharMemory 繁體中文翻譯已載入');
}
