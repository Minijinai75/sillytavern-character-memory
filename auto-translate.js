/**
 * CharMemory 診斷和活動區域即時翻譯腳本
 * 此腳本會自動將診斷面板和活動日誌中的英文文字翻譯為繁體中文
 */

(function() {
    'use strict';

    // 診斷檢查項目翻譯對照表
    const DIAGNOSTIC_TRANSLATIONS = {
        // 檢查項目標籤
        'Files enabled': '檔案已啟用',
        'Memory file in Data Bank': '資料庫中的記憶檔案',
        'File vectorized': '檔案已向量化',
        'Chunk overlap': '區塊重疊',
        'Chunk size': '區塊大小',
        'Retrieve chunks is high': '檢索區塊數過高',
        'Score threshold': '分數閾值',
        'Memories injected': '記憶已注入',
        'Duplicate memories': '重複記憶',

        // 常見詳細說明片段
        'Found:': '已找到：',
        'Not found': '未找到',
        'No memory file': '沒有記憶檔案',
        'Run an extraction first': '請先執行提取',
        'Indexed:': '已建立索引：',
        'chunks': '個區塊',
        'File exists but not yet vectorized': '檔案存在但尚未向量化',
        'Generate a message to trigger indexing': '生成一則訊息以觸發索引',
        'Overlap is 0%': '重疊為 0%',
        'Recommended:': '建議：',
        'helps prevent memory blocks from being split': '有助於防止記憶區塊被分割',
        'Chunk size': '區塊大小',
        'is smaller than': '小於',
        'average memory block': '平均記憶區塊',
        'may split blocks': '可能會分割區塊',
        'is much larger than': '遠大於',
        'reducing retrieval precision': '降低檢索精確度',
        'is appropriate for': '適合',
        'Retrieve chunks is set to': '檢索區塊數設定為',
        'is recommended': '建議使用',
        'For CharMemory': '對於 CharMemory',
        'Score threshold not set': '未設定分數閾值',
        'Score threshold': '分數閾值',
        'may be too low': '可能太低',
        'filters low-relevance matches': '過濾低相關性匹配',
        'injected': '已注入',
        'memory bullets': '個記憶項目',
        'No memories injected': '沒有注入記憶',
        'This may be normal': '這可能是正常的',
        'no memories scored above': '沒有記憶的分數高於',
        'relevance threshold': '相關性閾值',
        'duplicates found': '個重複項',
        'total': '總共',
        'unique': '唯一',
        'typically means chunk boundaries are splitting': '通常意味著區塊邊界正在分割',
        'Increase chunk overlap or chunk size': '請增加區塊重疊或區塊大小',
        'No duplicates': '沒有重複項',
        'all': '所有',
        'are unique': '都是唯一的',
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
        let text = node.textContent;
        let translated = false;

        // 嘗試完全匹配
        for (const [en, zh] of Object.entries({...DIAGNOSTIC_TRANSLATIONS, ...ACTIVITY_TRANSLATIONS, ...HEALTH_STATUS_TRANSLATIONS})) {
            if (text.trim() === en) {
                node.textContent = zh;
                translated = true;
                break;
            }
        }

        // 如果沒有完全匹配，嘗試部分替換
        if (!translated) {
            let newText = text;
            for (const [en, zh] of Object.entries({...DIAGNOSTIC_TRANSLATIONS, ...ACTIVITY_TRANSLATIONS})) {
                newText = newText.replace(new RegExp(en, 'gi'), zh);
            }
            if (newText !== text) {
                node.textContent = newText;
            }
        }
    }

    /**
     * 翻譯元素及其子元素
     */
    function translateElement(element) {
        if (!element) return;

        // 遍歷所有文字節點
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
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
                }
            });
        });

        // 觀察活動區域
        if (dashActivity) {
            observer.observe(dashActivity, {
                childList: true,
                subtree: true,
                characterData: true
            });
            // 初始翻譯
            translateElement(dashActivity);
        }

        // 觀察診斷區域
        if (dashDiag) {
            observer.observe(dashDiag, {
                childList: true,
                subtree: true,
                characterData: true
            });
            // 初始翻譯
            translateElement(dashDiag);
        }

        console.log('CharMemory 繁體中文翻譯已啟用');
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

})();
