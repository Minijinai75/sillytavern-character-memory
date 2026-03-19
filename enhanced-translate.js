/**
 * CharMemory 強化翻譯腳本 - 專門處理頑固的動態內容
 * 這個腳本會定期掃描並強制翻譯所有可能遺漏的內容
 */

(function() {
    'use strict';

    // 等待主翻譯腳本載入
    let retryCount = 0;
    const maxRetries = 50;

    function waitForMainTranslate() {
        if (window.CharMemory_translateElement && window.DIAGNOSTIC_TRANSLATIONS) {
            startEnhancedTranslation();
        } else if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(waitForMainTranslate, 100);
        }
    }

    function startEnhancedTranslation() {
        console.log('CharMemory 強化翻譯已啟動');

        // 翻譯對照表 - 與主腳本同步
        const TRANSLATIONS = {
            'Health Checks': '健康檢查',
            'Data Bank': '資料庫',
            'Diagnostic Report': '診斷報告',
            'Reset / Clear': '重設 / 清除',
            'Warnings detected': '偵測到警告',
            'Files enabled': '檔案已啟用',
            'Memory file in Data Bank': '資料庫中的記憶檔案',
            'File vectorized': '檔案已向量化',
            'Chunk overlap': '區塊重疊',
            'Chunk size': '區塊大小',
            'Retrieve chunks': '檢索區塊數',
            'Score threshold': '分數閾值',
            'Memories injected': '記憶已注入',
            'Duplicate memories': '重複記憶',
            'Vector Storage for files': '檔案的向量儲存',
            'File vectorization': '檔案向量化',
        };

        /**
         * 強制翻譯特定選擇器的元素
         */
        function forceTranslateSelectors() {
            // 翻譯所有按鈕
            const buttons = document.querySelectorAll('button, .charMemory_modalNavItem, [data-section]');
            buttons.forEach(button => {
                const text = button.textContent?.trim();
                if (text && TRANSLATIONS[text]) {
                    button.textContent = TRANSLATIONS[text];
                }
            });

            // 翻譯模態框導航
            const navItems = document.querySelectorAll('.charMemory_modalNavItem, [class*="modalNav"]');
            navItems.forEach(nav => {
                const text = nav.textContent?.trim();
                if (text && TRANSLATIONS[text]) {
                    nav.textContent = TRANSLATIONS[text];
                }
            });

            // 翻譯所有包含特定文字的元素
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                // 只翻譯直接包含文字的元素（不遞迴到子元素）
                if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
                    const text = el.textContent?.trim();
                    if (text && TRANSLATIONS[text]) {
                        el.textContent = TRANSLATIONS[text];
                    }
                }
            });
        }

        /**
         * 掃描並翻譯所有 CharMemory 相關內容
         */
        function scanAndTranslate() {
            // 使用主翻譯函數
            if (window.CharMemory_forceTranslate) {
                window.CharMemory_forceTranslate();
            }

            // 額外的選擇器翻譯
            forceTranslateSelectors();

            // 特別處理對話框
            const modals = document.querySelectorAll('.popup, .modal, [class*="modal"], [class*="dialog"]');
            modals.forEach(modal => {
                if (modal.offsetParent !== null || modal.style.display !== 'none') {
                    if (window.CharMemory_translateElement) {
                        window.CharMemory_translateElement(modal);
                    }
                    forceTranslateModal(modal);
                }
            });
        }

        /**
         * 強制翻譯模態框內容
         */
        function forceTranslateModal(modal) {
            // 翻譯所有文字節點
            const walker = document.createTreeWalker(
                modal,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            const textNodes = [];
            let node;
            while (node = walker.nextNode()) {
                if (node.textContent?.trim()) {
                    textNodes.push(node);
                }
            }

            textNodes.forEach(textNode => {
                const text = textNode.textContent.trim();
                if (TRANSLATIONS[text]) {
                    textNode.textContent = TRANSLATIONS[text];
                }
            });
        }

        // 每 500ms 掃描一次
        setInterval(scanAndTranslate, 500);

        // 監聽頁面變化
        const observer = new MutationObserver((mutations) => {
            let hasNewContent = false;

            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            hasNewContent = true;
                        }
                    });
                }
            });

            if (hasNewContent) {
                setTimeout(scanAndTranslate, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 監聽特定事件
        document.addEventListener('click', () => {
            setTimeout(scanAndTranslate, 300);
        });

        // 立即執行一次
        scanAndTranslate();

        // 提供全域函數
        window.CharMemory_enhancedTranslate = scanAndTranslate;

        console.log('CharMemory 強化翻譯已完成初始化');
    }

    // 開始等待主腳本
    waitForMainTranslate();

})();