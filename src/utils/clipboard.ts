import useClipboard from 'vue-clipboard3';
const { toClipboard } = useClipboard();

export const copy = async (val: string) => {
  try {
    await toClipboard(val);
    console.log('复制成功!')
    const copyText = await navigator.clipboard.readText();
    console.log('剪切板内容', copyText)
  } catch (e) {
    console.log(e);
  }
};
