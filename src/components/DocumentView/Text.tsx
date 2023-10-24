import { tcls } from '@/lib/tailwind';
import React from 'react';

export function Text(props: { text: any }) {
    const { text } = props;

    return (
        <>
            {text.leaves.map((leaf, index) => {
                return leaf.marks.reduce((children, mark) => {
                    const Mark = MARK_STYLES[mark.type];

                    if (!Mark) {
                        return children;
                    }

                    return (
                        <Mark key={mark.key} mark={mark}>
                            {children}
                        </Mark>
                    );
                }, leaf.text);
            })}
        </>
    );
}

const MARK_STYLES = {
    bold: Bold,
    italic: Italic,
    code: Code,
    strikethrough: Strikethrough,
};

interface MarkedLeafProps {
    mark: any;
    children: React.ReactNode;
}

function Bold(props: MarkedLeafProps) {
    return <strong className={tcls('font-semibold')}>{props.children}</strong>;
}

function Italic(props: MarkedLeafProps) {
    return <i className={tcls('font-italic')}>{props.children}</i>;
}

function Strikethrough(props: MarkedLeafProps) {
    return <s className={tcls('line-through')}>{props.children}</s>;
}

function Code(props: MarkedLeafProps) {
    return (
        <code className={tcls('text-slate-800', 'bg-slate-100', 'rounded', 'py-0.5', 'px-1')}>
            {props.children}
        </code>
    );
}
