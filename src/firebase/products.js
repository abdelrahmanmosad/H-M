import { collection, getDocs } from "firebase/firestore";
import { db } from "./index";


export const getProducts = async (coll) => {
    const productsCollectionRef = collection(db, `/HM/LGUn3PhtxLEzwGxNKXLI/${coll}`);
    const data = await getDocs(productsCollectionRef);
    return await (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));


}
