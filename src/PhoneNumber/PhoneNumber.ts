export type CountryInfo = {
    countryName: string; // clé unique
    countryIdentifier: number;
    placeholder?: string;
    validator: RegExp;
    fixeValidator?: RegExp;
    mobileValidator?: RegExp;
};

export const defaultCountriesInfo: CountryInfo = {
    countryName: "France",
    countryIdentifier: 33,
    validator: new RegExp("^(0[1-9]([0-9]{8}|[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2})|0[67]([0-9]{8}|[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}))$"),
    placeholder: "612345789"
}

export const countriesInfo: CountryInfo[] = [
    {
        countryName: "EtatUnis",
        countryIdentifier: 1,
        validator: new RegExp("")
    },
    {
        countryName: "France",
        countryIdentifier: 33,
        validator: new RegExp("^(0[1-9]([0-9]{8}|[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2})|0[67]([0-9]{8}|[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}))$"),
        placeholder: "612345789"
    },
    {
        countryName: "Allemagne",
        countryIdentifier: 49,
        validator: new RegExp("")
    }
];