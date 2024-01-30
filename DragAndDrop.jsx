import { useEffect, useState } from "react";
// import { Data, Status } from "../interfaces";

const DragAndDrop = (initialState) => {
    console.log("check initialState", initialState);
    const [isDragging, setIsDragging] = useState(false);
    const [listItems, setListItems] = useState(initialState);

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
       
    };

    const handleUpdateList = (id, status) => {
        console.log("check id status", id, status);
        let card = listItems.find((item => item.id === id));

        if (card && card.status !== status) {
            card.status = status;

            
            if (card.status === "Age <18") {
                card.age = getRandomNumber(1, 18);
            } else if (card.status === "Age 19-24") {
                card.age = getRandomNumber(19, 24);
            } else if (card.status === "Age 25-45") {
                card.age = getRandomNumber(25, 45);
            } else {
                card.age = getRandomNumber(46, 100);    
                
                // card.age = status === "Age <18" ? 17 : getRandomNumber(46, 100);
            }

    //         switch (card.status) {
    //             case "Age <18":
    //                 card.age = getRandomNumber(1, 18);
    //                 break;
    //             case "Age 19-24":
    //                 card.age = getRandomNumber(19, 24);
    //                 break;
    //             case "Age 25-45":
    //                 card.age = getRandomNumber(25, 45);
    //                 break;
    //             case "Age >45":
    //                 card.age = getRandomNumber(46, 100);
    //                 break;
    //             default:
    //                 break;
    //         }

            if (Array.isArray(listItems)) {
                setListItems(prev => [
                    card,
                    ...prev.filter(item => item.id !== id),
                ]);
            }
        }
    };

    
    

    // const handleUpdateList = (id, status) => {
    //     setListItems(prevList => prevList.map(item =>
    //         item.id === id ? { ...item, status } : item
    //     ));
    // };

    useEffect(() => {
        setListItems(initialState);
    }, [initialState]);

    const handleDragging = (dragging) => setIsDragging(dragging);

    return {
        isDragging,
        listItems,
        handleUpdateList,
        handleDragging,
    };
};

export default DragAndDrop;