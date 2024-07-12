import { productsData } from "./data";

const getSearchedResults = (searchText, page, limit) => {
    let dataPromise = new Promise((resolve, reject) => {
        let data = [];
        if (searchText.length === 0) {
            data = productsData.slice(0, ((page * limit) + limit));
        }
        else {
            let filteredData = productsData.filter(prod => prod.title.toLowerCase().includes(searchText.toLowerCase()));
            data = filteredData.slice(0, ((page * limit) + limit));
        }
        if (data.length) {
            setTimeout(() => {
                resolve(data);
            }, 2000);
        }
        else {
            setTimeout(() => {
                let err = new Error('No products found');
                reject(err);
            }, 2000);
        }
    });
    return dataPromise;
}

export default getSearchedResults;