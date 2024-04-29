export const getCO2EmissionRate = (input: string) => {
    let emission = null;

    switch (input.toUpperCase()) {
        case "CAR":
            emission = 0.56;
            break;
        case "MOTORCYCLE":
            emission = 0.3;
            break;
        case "BUS":
            emission = 0.25;
            break;
        case "WALKING":
            emission = 0;
            break;
        default:
            break;
    }

    return emission;
};
