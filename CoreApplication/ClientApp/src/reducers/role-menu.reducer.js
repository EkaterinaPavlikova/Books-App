const initialState = [{
        title: "Библиотека",
        path: "/library"
    },
    {
        title: "Мои книги",
        path: "/mybooks"
    },
    {
        title: "Редактирование",
        path: "/storekeeperpage"
    },
    {
        title: "Прием / Выдача",
        path: "/librarianpage"
    },
    {
        title: "Корзина",
        path: "/basket"
    }


]

export function menu(state = initialState, action) {
    switch (action.type) {
        default: return state
    }
}