export const REQUEST_METHODS = {
    GET: "GET",
    POST: "POST"
}

export const data = [
    {
        month: "Jan",
        value: 99,
    },
    {
        month: "Feb",
        value: 54,
    }, {
        month: "March",
        value: 21,
    },
    {
        month: "April",
        value: 21,
    },
    {
        month: "May",
        value: 21,
    },
    {
        month: "June",
        value: 21,
    },
    {
        month: "July",
        value: 21,
    },
    {
        month: "August",
        value: 21,
    },
    {
        month: "September",
        value: 21,
    },
    {
        month: "October",
        value: 21,
    }, {
        month: "November",
        value: 21,
    },
    {
        month: "December",
        value: 21,
    }
]

export const localAPI:apiModel = {
    categories:"categories.json",
    financialYear:"financial-year.json",
    categoryWiseData:"",
}
export const serverAPI:apiModel = {
    categories:"/dashboard/categories",
    financialYear:"/dashboard/financialYears",
    categoryWiseData:"/dashboard/categories",
}

export interface apiModel{
    categories:string,
    financialYear:string,
    categoryWiseData:string,
}