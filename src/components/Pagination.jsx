import React, { useEffect, useState } from "react";

export default function Pagination({
    items,
    displayedAmount,
    setDisplayedItems,
}) {
    const [totalPages, setTotalPages] = useState(0);
    const [pages, setPages] = useState([]);
    const [current, setCurrent] = useState(1);
    useEffect(() => {
        if (items.length === 0) {
            setDisplayedItems(items);
            setTotalPages(0);
            setPages([0]);
        } else if (items.length <= displayedAmount) {
            setTotalPages(1);
            setDisplayedItems(items);
            setPages([1]);
        } else {
            setTotalPages(Math.ceil(items.length / displayedAmount));
            let arrPages = [];
            for (
                let i = 1;
                i <= Math.ceil(items.length / displayedAmount);
                i++
            ) {
                arrPages.push(i);
            }
            setPages(arrPages);
            let auxArr = [...items];
            auxArr = auxArr.slice(
                (current - 1) * displayedAmount,
                current * displayedAmount
            );
            setDisplayedItems(auxArr);
        }
    }, [items]);

    useEffect(() => {
        if (items.length === 0) {
        } else {
            let auxArr = [...items];
            auxArr = auxArr.slice(
                (current - 1) * displayedAmount,
                current * displayedAmount
            );
            setDisplayedItems(auxArr);
        }
    }, [current]);

    const notCurrentClass =
        " hover:text-gray-2 hover:border-body hover:bg-body cursor-pointer";
    const currentClass = "text-gray-2 border-body bg-body cursor-default";
    return (
        <div className="bg-gray-2 flex flex-row mb-2 content-center justify-center items-center">
            {pages.map((e) => (
                <div
                    className={`my-2 mx-2 border-solid border-2 py-2 px-3 ${
                        e === current ? currentClass : notCurrentClass
                    }`}
                    key={`Pagination-${e}-ine`}
                    onClick={() => {
                        setCurrent(e);
                    }}
                >
                    {e}
                </div>
            ))}
        </div>
    );
}
