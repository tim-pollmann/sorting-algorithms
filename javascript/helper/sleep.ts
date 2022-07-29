export default async (milliseconds: number) => {
	return await new Promise(resolve => setTimeout(resolve, milliseconds));
};