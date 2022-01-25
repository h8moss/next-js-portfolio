import react, { useEffect, useState } from "react";
import React from "react";

const getChildOfLength = (node, length) => {
    if (length <= 0) return null;
    let current = 0;
    if (typeof node === 'string' || !isNaN(node)) {
        let str = String(node).substring(0, length);
        return [str, str.length];
    } else if (React.isValidElement(node)) {
        let newChildren = [];
        if (node.props.children === undefined) {
            return [node, 1];
        }
        for (let element of node.props.children) {
            let [currentChild, nodeLength] = getChildOfLength(element, length - current);
            current += nodeLength;
            newChildren.push(currentChild);
            if (current === length) {
                break;
            }
        }
        return [react.cloneElement(node, {}, newChildren), newChildren.length];
    }
    else {
        return [null, 0];
    }
}

const getMaxIndex = (node) => {
    if (typeof node === 'string' || !isNaN(node)) {
        return String(node).length;
    } else if (React.isValidElement(node)) {
        if (node.props.children === undefined) return 0;

        let result = 0;
        for (let element of node.props.children) {
            let current = getMaxIndex(element);
            result += current;
        }
        return result;
    } else {
        return 0;
    }
}

export default function TextStreamWriter({ children, delay, onDone }) {

    let [currentIndex, setCurrentIndex] = useState(0);

    let maxIndex = getMaxIndex(<div>{children}</div>);
    console.log(maxIndex);

    useEffect(() => {

        const increase = () => {
            if (currentIndex < maxIndex) {
                setCurrentIndex(currentIndex + 1);
            } else if (currentIndex === maxIndex) {
                if (onDone !== undefined)
                    onDone();
                currentIndex++;
            }
        }

        let timer = setInterval(increase, delay)

        return () => {
            clearInterval(timer);
        }
    });

    let [currentNode, _] = getChildOfLength(<div>{children}</div>, currentIndex) ?? [null, 0];

    return (
        <div>
            {currentNode}
        </div>
    );
}