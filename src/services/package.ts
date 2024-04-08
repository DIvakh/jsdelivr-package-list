import registryInstance from './api/apiRegistry';
import jsdelivrInstance from './api/apiJsdelivr';

export async function apiGetSearch(searchParams: Record<string, string>) {
  try {
    const response = await registryInstance.get('/search', {
      params: {
        ...searchParams
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function apiGetPackage(packageName: string) {
  try {
    const response = await jsdelivrInstance.get(`/packages/npm/${packageName}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function apiGetPackageEntryPoints(
  packageName: string,
  packageVersion: string
) {
  try {
    const response = await jsdelivrInstance.get(
      `/packages/npm/${packageName}@${packageVersion}/entrypoints `
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function apis() {
  console.log(await apiGetSearch({ query: 'vue' }));
}
apis();
