import "./styles/index.scss"
const elvenShieldRecipe ={
    leatherStips: 2,
    ironIngot:1,
};
const a = {
    ...elvenShieldRecipe, leather:23
}
console.log(elvenShieldRecipe);
console.log(a);