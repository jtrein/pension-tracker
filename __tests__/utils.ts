import { faker } from "@faker-js/faker";

export const fakeWords = (count = 3) => faker.lorem.sentence(count);
