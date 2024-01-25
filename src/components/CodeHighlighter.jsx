import SyntaxHighlighter from 'react-syntax-highlighter';
import { arduinoLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeHighlighter = ({ code }) => {
    return (
        <SyntaxHighlighter
            language="arduino"
            style={arduinoLight}
            customStyle={{ height: 230, maxHeight: 230, minHeight: 230, overflowY: scroll, padding: 0,
            margin: 0 }}
            lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
            wrapLines
        >
            {code}
        </SyntaxHighlighter>
    )
};

export default CodeHighlighter;