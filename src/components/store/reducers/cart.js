const INITIAL = {
    cartProducts: [],
};

export default function cartReducre(state = INITIAL, action) {

    switch (action.type) {
        case "add-product":
            return {
                ...state,
                cartProducts: action.payload
            };
        default:
            return state;
    }

}