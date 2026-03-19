/**
 * CharMemory 診斷和活動區域即時翻譯腳本
 * 此腳本會自動將診斷面板和活動日誌中的英文文字翻譯為繁體中文
 */

(function() {
    'use strict';

    // 診斷檢查項目翻譯對照表
    const DIAGNOSTIC_TRANSLATIONS = {
        // 對話框標題和主要標籤
        'Health Checks': '健康檢查',
        'Warnings detected': '偵測到警告',
        'Data Bank': '資料庫',
        'Diagnostic Report': '診斷報告',
        'Reset / Clear': '重設 / 清除',

        // 檢查項目標籤
        'Vector Storage for files': '檔案的向量儲存',
        'Files enabled': '檔案已啟用',
        'Memory file in Data Bank': '資料庫中的記憶檔案',
        'File vectorized': '檔案已向量化',
        'File vectorization': '檔案向量化',
        'Chunk overlap': '區塊重疊',
        'Chunk size': '區塊大小',
        'Retrieve chunks': '檢索區塊數',
        'Retrieve chunks is high': '檢索區塊數過高',
        'Score threshold': '分數閾值',
        'Memories injected': '記憶已注入',
        'Duplicate memories': '重複記憶',
        'Duplicate detection': '重複偵測',

        // 常見詳細說明片段
        'Enabled': '已啟用',
        'Enabled —': '已啟用 —',
        'Not enabled': '未啟用',
        'Data Bank files will be vectorized': '資料庫檔案將被向量化',
        'Vector Storage is not enabled for files': '向量儲存未為檔案啟用',
        'Open Extensions → Vector Storage → File vectorization settings → Enable for files': '開啟 Extensions → Vector Storage → File vectorization settings → Enable for files',

        'Found:': '已找到：',
        'Not found': '未找到',
        'Not found:': '未找到：',
        'No memory file': '沒有記憶檔案',
        "Use 'Extract Now' on the dashboard to create this character's memory file.": "在儀表板上使用「立即提取」以建立此角色的記憶檔案。",
        "Run an extraction first": '請先執行提取',
        'Run an extraction to create the memory file.': '執行提取以建立記憶檔案。',

        'Indexed:': '已建立索引：',
        'chunks': '個區塊',
        'chunk': '個區塊',
        'File exists but not yet vectorized': '檔案存在但尚未向量化',
        'Generate a message to trigger indexing': '生成一則訊息以觸發索引',
        'Generate a message to trigger indexing.': '生成一則訊息以觸發索引。',

        'Overlap is 0%': '重疊為 0%',
        'Recommended:': '建議：',
        'recommended': '建議',
        'helps prevent memory blocks from being split': '有助於防止記憶區塊被分割',
        'Memory blocks that span chunk boundaries may be split': '跨區塊邊界的記憶區塊可能會被分割',

        'is smaller than': '小於',
        'average memory block': '平均記憶區塊',
        'may split blocks': '可能會分割區塊',
        'may split blocks mid-content': '可能會在內容中間分割區塊',
        'is much larger than': '遠大於',
        'reducing retrieval precision': '降低檢索精確度',
        'is appropriate for': '適合',
        'Multiple blocks may be packed': '多個區塊可能被打包',
        'This may split blocks mid-content': '這可能會在內容中間分割區塊',

        'Retrieve chunks is set to': '檢索區塊數設定為',
        'is recommended': '建議使用',
        'For CharMemory': '對於 CharMemory',
        'Higher values inject more memories': '較高的值會注入更多記憶',
        'which can flood the prompt': '這可能會淹沒提示',

        'Score threshold not set': '未設定分數閾值',
        'may be too low': '可能太低',
        'filters low-relevance matches': '過濾低相關性匹配',
        'All retrieved memories will be injected': '所有檢索到的記憶都會被注入',
        'including irrelevant ones': '包括不相關的記憶',

        'injected': '已注入',
        'memory bullets': '個記憶項目',
        'memory bullet': '個記憶項目',
        'No memories injected': '沒有注入記憶',
        'This may be normal': '這可能是正常的',
        'no memories scored above': '沒有記憶的分數高於',
        'relevance threshold': '相關性閾值',
        'Try lowering the score threshold': '請嘗試降低分數閾值',

        'duplicates found': '個重複項',
        'duplicate found': '個重複項',
        'total': '總共',
        'unique': '唯一',
        'typically means chunk boundaries are splitting': '通常意味著區塊邊界正在分割',
        'Increase chunk overlap or chunk size': '請增加區塊重疊或區塊大小',
        'No duplicates': '沒有重複項',
        'all': '所有',
        'are unique': '都是唯一的',

        // 按鈕和連結
        'Re-run checks': '重新執行檢查',
        'Refresh': '重新整理',
        'View details': '查看詳情',
        'Close': '關閉',
        'OK': '確定',
    };

    // 活動日誌動作翻譯
    const ACTIVITY_TRANSLATIONS = {
        'Extracting': '提取中',
        'Extracted': '已提取',
        'Consolidating': '整合中',
        'Consolidated': '已整合',
        'Reformatting': '重新格式化中',
        'Reformatted': '已重新格式化',
        'Saved': '已儲存',
        'Deleted': '已刪除',
        'Imported': '已匯入',
        'Exported': '已匯出',
        'memories': '個記憶',
        'from': '從',
        'chunks': '個區塊',
        'messages': '則訊息',
        'Error:': '錯誤：',
        'Warning:': '警告：',
        'No activity yet.': '尚無活動。',
        'No diagnostics yet.': '尚無診斷資訊。',
    };

    // 健康狀態翻譯
    const HEALTH_STATUS_TRANSLATIONS = {
        'Healthy': '健康',
        'Good': '良好',
        'Warning': '警告',
        'Error': '錯誤',
        'OK': '正常',
        'Ready': '就緒',
    };

    /**
     * 翻譯文字節點
     */
    function translateTextNode(node) {
        if (!node || !node.textContent) return;

        let text = node.textContent.trim();
        if (!text) return;

        let translated = false;

        // 嘗試完全匹配
        for (const [en, zh] of Object.entries({...DIAGNOSTIC_TRANSLATIONS, ...ACTIVITY_TRANSLATIONS, ...HEALTH_STATUS_TRANSLATIONS})) {
            if (text === en) {
                node.textContent = node.textContent.replace(en, zh);
                translated = true;
                break;
            }
        }

        // 如果沒有完全匹配，嘗試部分替換
        if (!translated) {
            let newText = node.textContent;
            let hasChange = false;

            // 按長度排序，優先替換較長的字串
            const entries = Object.entries({...DIAGNOSTIC_TRANSLATIONS, ...ACTIVITY_TRANSLATIONS})
                .sort((a, b) => b[0].length - a[0].length);

            for (const [en, zh] of entries) {
                if (newText.includes(en)) {
                    newText = newText.replace(new RegExp(en, 'g'), zh);
                    hasChange = true;
                }
            }

            if (hasChange && newText !== node.textContent) {
                node.textContent = newText;
            }
        }
    }

    /**
     * 翻譯元素及其子元素
     */
    function translateElement(element) {
        if (!element) return;

        // 先翻譯按鈕元素的直接文字內容（不遞迴）
        if (element.tagName === 'BUTTON' || element.classList?.contains('charMemory_modalNavItem')) {
            const text = element.textContent?.trim();
            if (text && DIAGNOSTIC_TRANSLATIONS[text]) {
                element.textContent = DIAGNOSTIC_TRANSLATIONS[text];
                return; // 已翻譯，不需要繼續
            }
        }

        // 遍歷所有文字節點
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // 跳過 script 和 style 標籤
                    const parent = node.parentElement;
                    if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // 只處理有內容的文字節點
                    if (node.textContent && node.textContent.trim()) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            },
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        textNodes.forEach(translateTextNode);
    }

    /**
     * 監視診斷和活動區域的變化
     */
    function setupTranslationObserver() {
        const dashActivity = document.getElementById('charMemory_dashActivity');
        const dashDiag = document.getElementById('charMemory_dashDiagSummary');

        // 創建觀察器
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            translateElement(node);
                        }
                    });
                } else if (mutation.type === 'characterData') {
                    translateTextNode(mutation.target);
                }
            });
        });

        // 配置選項
        const observerConfig = {
            childList: true,
            subtree: true,
            characterData: true,
            characterDataOldValue: false
        };

        // 觀察活動區域
        if (dashActivity) {
            observer.observe(dashActivity, observerConfig);
            translateElement(dashActivity);
        }

        // 觀察診斷區域
        if (dashDiag) {
            observer.observe(dashDiag, observerConfig);
            translateElement(dashDiag);
        }

        // 觀察對話框和彈出視窗
        // 監視整個 body 以捕捉動態創建的對話框
        const bodyObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // 檢查是否為對話框、彈出視窗或模態框
                        if (
                            node.classList?.contains('popup') ||
                            node.classList?.contains('modal') ||
                            node.classList?.contains('dialogue') ||
                            node.id?.includes('charMemory') ||
                            node.querySelector?.('[id*="charMemory"]')
                        ) {
                            // 延遲一點以確保內容已載入
                            setTimeout(() => translateElement(node), 50);
                        }
                    }
                });
            });
        });

        bodyObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('CharMemory 繁體中文翻譯已啟用 - 監視對話框和彈出視窗');
    }

    // 等待 DOM 載入完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupTranslationObserver);
    } else {
        setupTranslationObserver();
    }

    // 也監聽 SillyTavern 的自定義事件
    document.addEventListener('charMemory_diagnosticsUpdated', () => {
        setTimeout(() => {
            translateElement(document.getElementById('charMemory_dashDiagSummary'));
        }, 100);
    });

    document.addEventListener('charMemory_activityUpdated', () => {
        setTimeout(() => {
            translateElement(document.getElementById('charMemory_dashActivity'));
        }, 100);
    });

    // 監聽點擊事件以翻譯新開啟的對話框
    document.addEventListener('click', (e) => {
        // 延遲執行以確保對話框已經顯示
        setTimeout(() => {
            // 翻譯所有可見的對話框
            const popups = document.querySelectorAll('.popup:not([style*="display: none"]), .modal:not([style*="display: none"])');
            popups.forEach(popup => translateElement(popup));

            // 翻譯健康檢查按鈕開啟的對話框
            const healthDialogs = document.querySelectorAll('[class*="health"], [class*="diagnostic"], [id*="charMemory"]');
            healthDialogs.forEach(dialog => {
                if (dialog.offsetParent !== null) { // 檢查是否可見
                    translateElement(dialog);
                }
            });
        }, 200);
    }, true);

    // 全域翻譯函數，供外部調用
    window.CharMemory_translateElement = translateElement;
    window.CharMemory_forceTranslate = function() {
        // 強制翻譯整個頁面的 CharMemory 相關內容
        const elements = document.querySelectorAll('[id*="charMemory"], [class*="charMemory"]');
        elements.forEach(el => translateElement(el));
        console.log('CharMemory 強制翻譯已執行');
    };

})();
