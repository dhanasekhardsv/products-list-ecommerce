const generateRandomId = () => {
    return (new Date().valueOf()).toString();
}

export default generateRandomId;