import registryInstance from './api/apiRegistry';
import jsdelivrInstance from './api/apiJsdelivr';

export async function apiGetSearch(searchParams: Record<string, any>) {
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

async function apis() {
  console.log(await apiGetSearch({ query: 'vue' }));
}
apis();
