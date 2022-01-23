import axios from "axios";

export const getDistance = async (from, to) => {

        try {
          
            let res = await axios.get(`https://www.distance24.org/route.json?stops=${from}|${to}`);
            let distance = await res.data.distance;
            return distance;
        }catch (e) {
            console.error(e);
        }

    };