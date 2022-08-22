const INITIAL = {
    favProducts: [],
};

export default function favReducre(state = INITIAL, action) {

    switch (action.type) {
        case "add-favourit":
            return {
                ...state,
                favProducts: action.payload
            };
        default:
            return state;
    }

}