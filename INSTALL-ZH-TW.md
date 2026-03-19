# CharMemory 繁體中文版安裝說明

本專案是 [bal-spec/sillytavern-character-memory](https://github.com/bal-spec/sillytavern-character-memory) 的繁體中文版 Fork

## 中文化內容

✅ **已完成中文化的部分：**

1. **文檔檔案**
   - ✅ README.zh-TW.md - 主要說明文件（繁體中文版）
   - ✅ docs/zh-TW/getting-started.md - 入門指南（繁體中文）

2. **介面檔案**
   - ✅ settings.html - 所有介面文字已翻譯為繁體中文
   - ✅ manifest.json - 擴充套件顯示名稱更新為「CharMemory (繁體中文)」

3. **翻譯資源**
   - ✅ i18n-zh-TW.js - 完整的繁體中文翻譯字串集（包含所有 UI 訊息、錯誤提示、按鈕文字等）

## 安裝方式

### 方法一：直接從本 Fork 安裝

1. 點擊 SillyTavern 頂部欄中的**擴充套件**圖示（拼圖圖示）
2. 點擊**安裝擴充套件** → 貼上以下 URL → **僅為我安裝**：
   ```
   https://github.com/YOUR-USERNAME/sillytavern-character-memory
   ```
   （請將 YOUR-USERNAME 替換為你的 GitHub 使用者名稱）

### 方法二：手動安裝

1. 下載本專案的 ZIP 檔案
2. 解壓縮到 SillyTavern 的 `public/scripts/extensions/third-party/` 目錄下
3. 重新啟動 SillyTavern

## 使用說明

安裝後，您將看到：

- 擴充套件面板中的介面文字全部為繁體中文
- 所有按鈕、標籤、提示訊息都已中文化
- 完整的繁體中文文檔可供參考

### 查看中文文檔

- [README.zh-TW.md](README.zh-TW.md) - 完整功能說明
- [docs/zh-TW/getting-started.md](docs/zh-TW/getting-started.md) - 入門指南

## 進階：完整整合 i18n 翻譯系統

本專案包含了 `i18n-zh-TW.js` 檔案，其中包含所有介面字串的繁體中文翻譯。如果您想要進一步整合翻譯系統（將 JavaScript 程式碼中的訊息也中文化），可以參考以下步驟：

### 步驟 1：載入 i18n 檔案

在 `manifest.json` 中添加 i18n 檔案：

```json
{
    "js": ["i18n-zh-TW.js", "index.js"]
}
```

### 步驟 2：在程式碼中使用翻譯

在 `index.js` 中使用翻譯對象：

```javascript
// 原本的英文
toastr.success('Memories saved.');

// 使用翻譯
toastr.success(window.CharMemory_i18n.success.promptSaved);
```

## 翻譯涵蓋範圍

### 1. 介面元素（settings.html）
- ✅ 面板標題和按鈕
- ✅ 統計欄位和工具提示
- ✅ 主控制按鈕
- ✅ 資料庫工具
- ✅ 活動和診斷區域

### 2. 程式訊息（i18n-zh-TW.js）
- ✅ 成功訊息（toastr.success）- 23 條
- ✅ 錯誤訊息（toastr.error）- 13 條
- ✅ 警告訊息（toastr.warning）- 14 條
- ✅ 資訊訊息（toastr.info）- 15 條
- ✅ 按鈕文字
- ✅ 標籤和提示
- ✅ 對話框文字
- ✅ 注入檢視器
- ✅ 提供商名稱

### 3. 文檔
- ✅ README.zh-TW.md - 主要說明
- ✅ docs/zh-TW/getting-started.md - 入門指南
- ⏳ 其他文檔（可根據需要陸續翻譯）

## 技術細節

### 中文化方法

本專案採用混合方法進行中文化：

1. **靜態介面**：直接修改 `settings.html` 中的文字
2. **動態訊息**：建立 `i18n-zh-TW.js` 翻譯資源檔案
3. **文檔**：創建對應的 `.zh-TW.md` 和 `docs/zh-TW/` 目錄

### 維護和更新

當原始專案更新時：

1. 合併上游變更：
   ```bash
   git remote add upstream https://github.com/bal-spec/sillytavern-character-memory.git
   git fetch upstream
   git merge upstream/master
   ```

2. 檢查並更新新增的字串翻譯

3. 更新版本號（在 `manifest.json` 中添加 `-zh-TW` 後綴）

## 貢獻

歡迎協助改進翻譯！如果您發現：

- 翻譯不準確或不自然的地方
- 遺漏的翻譯內容
- 更好的翻譯建議

請提交 Issue 或 Pull Request。

## 授權

本專案遵循原始專案的授權條款。翻譯部分同樣採用相同授權。

## 致謝

- 原始專案：[bal-spec/sillytavern-character-memory](https://github.com/bal-spec/sillytavern-character-memory)
- 翻譯：Claude (Anthropic)

## 聯繫方式

如有問題或建議，歡迎在 GitHub 上提交 Issue。

---

## 快速開始

1. 安裝擴充套件
2. 閱讀 [入門指南（繁體中文）](docs/zh-TW/getting-started.md)
3. 開啟 CharMemory 面板（在 SillyTavern 擴充套件區域）
4. 點擊魔杖圖示開啟設定精靈
5. 按照精靈指示配置 LLM 和向量儲存
6. 開始聊天，記憶會自動提取！

享受使用 CharMemory 繁體中文版！ 🎉
