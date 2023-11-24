//user-type-interface
export type Taddress = {
    street: string;
    city: string;
    country: string;
}
export type Tname = {
    firstName: string;
    lastName: string
}

export type user = {
    userId: number;
    username: string;
    password: string;
    fullName: Tname;
    age: number;
    email: string;
    isActive: boolean,
    hobbies: [string, string],
    address: Taddress
}
