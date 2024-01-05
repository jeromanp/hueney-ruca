const { configureStore } = require("@reduxjs/toolkit");

const store = () =>
    configureStore({
        reducer: {},
        devTools: true,
    })

export default store;