# 分頁標籤翻譯測試指南

## 🎯 測試目標
驗證疑難排解器中的分頁標籤是否正確翻譯為繁體中文。

## 🔧 測試步驟

### 1. 重新安裝/更新擴充套件

如果已安裝，請先移除再重新安裝：

1. 在 SillyTavern 點擊**擴充套件**
2. 找到 CharMemory，點擊**移除**
3. 重新安裝：
   ```
   https://github.com/Minijinai75/sillytavern-character-memory#zh-tw-localization
   ```

### 2. 開啟疑難排解器

1. 找到 CharMemory 面板
2. 點擊面板標題中的**扳手圖示**（🔧）
3. 疑難排解器對話框會開啟

### 3. 檢查分頁標籤

應該看到以下**繁體中文**標籤：

- ✅ **健康檢查** (原：Health Checks)
- ✅ **資料庫** (原：Data Bank)
- ✅ **診斷報告** (原：Diagnostic Report)
- ✅ **重設 / 清除** (原：Reset / Clear)

### 4. 測試分頁切換

1. 點擊每個標籤
2. 確認標籤文字保持中文
3. 檢查頁面內容是否也是中文

### 5. 如果標籤仍是英文

嘗試以下方法：

#### 方法 1：手動觸發強化翻譯

1. 按 **F12** 開啟開發者工具
2. 在 **Console** 輸入：
   ```javascript
   CharMemory_enhancedTranslate()
   ```
3. 按 **Enter**
4. 檢查標籤是否已翻譯

#### 方法 2：等待自動翻譯

1. 等待 2-3 秒
2. 強化翻譯每 500ms 執行一次
3. 標籤應該會自動變成中文

#### 方法 3：重新開啟對話框

1. 關閉疑難排解器
2. 重新點擊扳手圖示
3. 檢查標籤是否已翻譯

#### 方法 4：檢查載入狀態

在 Console 應該看到：
```
CharMemory 繁體中文翻譯已載入
CharMemory 繁體中文翻譯已啟用 - 監視對話框和彈出視窗
CharMemory 強化翻譯已啟動
CharMemory 強化翻譯已完成初始化
```

如果沒有看到最後兩行，表示強化翻譯未載入。

## 📷 預期結果

### 成功案例

對話框頂部的標籤欄應該顯示：

```
[健康檢查] [資料庫] [診斷報告] [重設 / 清除]
```

### 失敗案例

如果仍顯示：

```
[Health Checks] [Data Bank] [Diagnostic Report] [Reset / Clear]
```

表示翻譯未生效。

## 🐛 故障排除

### 1. 檢查腳本載入順序

在 Console 輸入：
```javascript
console.log('i18n:', !!window.CharMemory_i18n);
console.log('translate:', !!window.CharMemory_translateElement);
console.log('enhanced:', !!window.CharMemory_enhancedTranslate);
```

應該都返回 `true`。

### 2. 手動檢查元素

```javascript
// 檢查是否有導航按鈕
document.querySelectorAll('.charMemory_modalNavItem').forEach(el => {
    console.log('Button text:', el.textContent);
});
```

### 3. 強制翻譯特定元素

```javascript
// 強制翻譯所有按鈕
document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.trim() === 'Health Checks') {
        btn.textContent = '健康檢查';
    }
    if (btn.textContent.trim() === 'Data Bank') {
        btn.textContent = '資料庫';
    }
    if (btn.textContent.trim() === 'Diagnostic Report') {
        btn.textContent = '診斷報告';
    }
    if (btn.textContent.trim() === 'Reset / Clear') {
        btn.textContent = '重設 / 清除';
    }
});
```

## 📋 完整測試清單

**疑難排解器分頁標籤：**
- [ ] "健康檢查" 標籤顯示正確
- [ ] "資料庫" 標籤顯示正確
- [ ] "診斷報告" 標籤顯示正確
- [ ] "重設 / 清除" 標籤顯示正確
- [ ] 點擊標籤可正常切換
- [ ] 切換後標籤文字保持中文

**其他檢查：**
- [ ] 頁面內容也是中文
- [ ] 按鈕和連結是中文
- [ ] 沒有錯誤訊息
- [ ] Console 顯示正確的載入訊息

## 📞 問題回報

如果測試失敗，請提供：

1. **截圖** - 顯示英文標籤
2. **Console 日誌** - F12 → Console 的輸出
3. **瀏覽器版本** - Chrome/Edge/Firefox
4. **SillyTavern 版本**

在 GitHub 回報：
https://github.com/Minijinai75/sillytavern-character-memory/issues

---

## ⚡ 快速修復

如果一切都失敗了，使用這個緊急修復：

```javascript
// 緊急修復腳本 - 貼到 Console 執行
setTimeout(() => {
    const translations = {
        'Health Checks': '健康檢查',
        'Data Bank': '資料庫',
        'Diagnostic Report': '診斷報告',
        'Reset / Clear': '重設 / 清除'
    };

    document.querySelectorAll('button, .charMemory_modalNavItem, [data-section]').forEach(el => {
        const text = el.textContent?.trim();
        if (translations[text]) {
            el.textContent = translations[text];
            console.log('已翻譯:', text, '→', translations[text]);
        }
    });
}, 1000);
```

這個腳本會在 1 秒後強制翻譯所有標籤。

---

成功翻譯後，你應該看到完全中文化的疑難排解器！🎉