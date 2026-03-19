# 分頁內部翻譯測試腳本

## 🧪 立即測試分頁內容翻譯

將以下腳本複製到瀏覽器 Console 執行，可立即測試所有分頁內部內容是否翻譯：

```javascript
// CharMemory 分頁內部翻譯測試腳本
(function testTabContentTranslation() {
    console.log('🔍 開始測試分頁內部翻譯...');

    // 分頁內容翻譯對照表
    const expectedTranslations = {
        // 分頁標籤
        'Health Checks': '健康檢查',
        'Data Bank': '資料庫',
        'Diagnostic Report': '診斷報告',
        'Reset / Clear': '重設 / 清除',

        // 重設/清除分頁按鈕
        'Reset This Chat': '重設此對話',
        'Reset Batch Progress': '重設批次進度',
        'Clear All Memories': '清除所有記憶',

        // 資料庫分頁按鈕 title
        'View file contents': '檢視檔案內容',
        'Download file': '下載檔案',
        'Delete file': '刪除檔案',
        'Convert file format': '轉換檔案格式',

        // 標題
        'Reset': '重設',
    };

    let testResults = [];

    // 測試函數
    function testElement(selector, description) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, i) => {
            const text = el.textContent?.trim();
            const title = el.getAttribute('title');

            if (text && expectedTranslations[text]) {
                testResults.push({
                    type: '✅ PASS',
                    selector: `${selector}[${i}]`,
                    description: `${description} 文字`,
                    found: text,
                    expected: expectedTranslations[text],
                    success: el.textContent.includes(expectedTranslations[text])
                });
            }

            if (title && expectedTranslations[title]) {
                testResults.push({
                    type: '✅ PASS',
                    selector: `${selector}[${i}]`,
                    description: `${description} title`,
                    found: title,
                    expected: expectedTranslations[title],
                    success: el.getAttribute('title').includes(expectedTranslations[title])
                });
            }
        });
    }

    // 執行測試
    testElement('.charMemory_modalNavItem', '分頁標籤');
    testElement('input[type="button"]', '按鈕');
    testElement('button', '按鈕');
    testElement('h4.charMemory_modalSectionTitle', '標題');
    testElement('[title*="View file"]', '檢視檔案按鈕');
    testElement('[title*="Download"]', '下載按鈕');
    testElement('[title*="Delete"]', '刪除按鈕');
    testElement('[title*="Convert"]', '轉換按鈕');

    // 輸出結果
    console.log('\n📋 測試結果：');
    console.log('=' .repeat(60));

    if (testResults.length === 0) {
        console.log('⚠️  未找到任何可測試的元素');
        console.log('💡 請先開啟疑難排解器對話框');
    } else {
        testResults.forEach(result => {
            const status = result.success ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} ${result.description}`);
            console.log(`   Found: "${result.found}"`);
            console.log(`   Expected: "${result.expected}"`);
            console.log(`   Element: ${result.selector}\n`);
        });

        const passCount = testResults.filter(r => r.success).length;
        const totalCount = testResults.length;

        console.log(`📊 總結: ${passCount}/${totalCount} 項目翻譯正確`);

        if (passCount === totalCount) {
            console.log('🎉 所有分頁內容翻譯完成！');
        } else {
            console.log('⚠️  部分內容未翻譯，請手動執行強化翻譯：');
            console.log('CharMemory_enhancedTranslate();');
        }
    }

})();
```

## 🔧 手動修復未翻譯內容

如果測試發現未翻譯的內容，執行以下腳本強制翻譯：

```javascript
// 強制翻譯分頁內部所有內容
(function forceTranslateTabContent() {
    const translations = {
        'Reset This Chat': '重設此對話',
        'Reset Batch Progress': '重設批次進度',
        'Clear All Memories': '清除所有記憶',
        'Reset': '重設',
        'View file contents': '檢視檔案內容',
        'Download file': '下載檔案',
        'Delete file': '刪除檔案',
        'Convert file format': '轉換檔案格式',
        'Delete this character\'s memory file and reset extraction tracking — cannot be undone': '刪除此角色的記憶檔案並重設提取追蹤 — 無法復原'
    };

    // 翻譯按鈕文字
    document.querySelectorAll('input[type="button"], button').forEach(btn => {
        const text = btn.value || btn.textContent?.trim();
        if (translations[text]) {
            if (btn.value) {
                btn.value = translations[text];
            } else {
                btn.textContent = translations[text];
            }
            console.log(`✅ 已翻譯按鈕: ${text} → ${translations[text]}`);
        }
    });

    // 翻譯 title 屬性
    document.querySelectorAll('[title]').forEach(el => {
        const title = el.getAttribute('title');
        for (const [en, zh] of Object.entries(translations)) {
            if (title?.includes(en)) {
                const newTitle = title.replace(new RegExp(en, 'g'), zh);
                el.setAttribute('title', newTitle);
                console.log(`✅ 已翻譯 title: ${en} → ${zh}`);
            }
        }
    });

    // 翻譯標題
    document.querySelectorAll('h4.charMemory_modalSectionTitle, h3, h4').forEach(heading => {
        const text = heading.textContent?.trim();
        if (translations[text]) {
            heading.textContent = translations[text];
            console.log(`✅ 已翻譯標題: ${text} → ${translations[text]}`);
        }
    });

    // 翻譯說明文字
    document.querySelectorAll('.charMemory_helperText, small').forEach(helper => {
        let text = helper.textContent;
        let changed = false;

        const textTranslations = {
            'Resets the extraction pointer for the active chat': '重設當前對話的提取指標',
            'Next "Extract Now" will re-read all messages': '下次「立即提取」將重新讀取所有訊息',
            'Group chat': '群組聊天',
            'all members share one extraction pointer': '所有成員共享一個提取指標',
            'The Batch tool remembers the last message': '批次工具會記住最後一則訊息',
            'Does not affect Extract Now': '不影響立即提取',
            'Deletes this character\'s memory file': '刪除此角色的記憶檔案',
            'Cannot be undone': '無法復原'
        };

        for (const [en, zh] of Object.entries(textTranslations)) {
            if (text.includes(en)) {
                text = text.replace(new RegExp(en, 'g'), zh);
                changed = true;
            }
        }

        if (changed) {
            helper.textContent = text;
            console.log(`✅ 已翻譯說明文字`);
        }
    });

    console.log('🎉 分頁內部翻譯已完成！');
})();
```

## 🧪 分段測試步驟

### 1. 測試分頁標籤
```javascript
// 檢查分頁標籤是否翻譯
document.querySelectorAll('.charMemory_modalNavItem').forEach((tab, i) => {
    console.log(`Tab ${i}: "${tab.textContent}"`);
});
```

預期結果：
```
Tab 0: "健康檢查"
Tab 1: "資料庫"
Tab 2: "診斷報告"
Tab 3: "重設 / 清除"
```

### 2. 測試重設/清除分頁按鈕
```javascript
// 點擊重設/清除分頁，然後檢查按鈕
document.querySelector('[data-section="reset"]')?.click();
setTimeout(() => {
    document.querySelectorAll('#cm_modal_resetThisChat, #cm_modal_resetBatchProgress, #cm_modal_resetExtraction').forEach(btn => {
        console.log(`Button: "${btn.value}" | Title: "${btn.title}"`);
    });
}, 500);
```

預期結果：
```
Button: "重設此對話" | Title: "重設當前對話的提取指標..."
Button: "重設批次進度" | Title: "清除此角色所有對話的批次提取記錄..."
Button: "清除所有記憶" | Title: "刪除此角色的記憶檔案並重設提取追蹤 — 無法復原"
```

### 3. 測試資料庫分頁按鈕
```javascript
// 點擊資料庫分頁，然後檢查檔案操作按鈕
document.querySelector('[data-section="databank"]')?.click();
setTimeout(() => {
    document.querySelectorAll('.charMemory_tsViewBtn, .charMemory_tsExportBtn, .charMemory_tsDeleteBtn, .charMemory_tsConvertBtn').forEach(btn => {
        console.log(`Button title: "${btn.title}"`);
    });
}, 500);
```

預期結果：
```
Button title: "檢視檔案內容"
Button title: "下載檔案"
Button title: "刪除檔案"
Button title: "轉換檔案格式"
```

## 📋 完整測試清單

運行以上測試後，確認以下內容都是中文：

**分頁標籤：**
- [ ] 健康檢查
- [ ] 資料庫
- [ ] 診斷報告
- [ ] 重設 / 清除

**重設/清除分頁：**
- [ ] "重設此對話" 按鈕
- [ ] "重設批次進度" 按鈕
- [ ] "清除所有記憶" 按鈕
- [ ] "重設" 標題
- [ ] 說明文字為中文

**資料庫分頁：**
- [ ] "檢視檔案內容" tooltip
- [ ] "下載檔案" tooltip
- [ ] "刪除檔案" tooltip
- [ ] "轉換檔案格式" tooltip

**健康檢查分頁：**
- [ ] 所有檢查項目為中文
- [ ] 詳細說明為中文

## 🚀 最新版本安裝

如果發現問題，重新安裝最新版本：

```
https://github.com/Minijinai75/sillytavern-character-memory#zh-tw-localization
```

現在分頁內部的所有內容都應該完全中文化了！🎉