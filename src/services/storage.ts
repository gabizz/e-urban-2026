import localforage from 'localforage';

localforage.config({
  name: 'e-urban',
  storeName: 'forms'
});

export interface FormSubmission {
  id: string;
  createdAt: number;
  data: any;
}

export const saveForm = async (data: any): Promise<void> => {
  const forms: FormSubmission[] = await getForms();
  const existingIndex = forms.findIndex(f => f.id === data.id);
  
  if (existingIndex >= 0) {
    forms[existingIndex] = { ...forms[existingIndex], data };
  } else {
    forms.push({
      id: data.id || Date.now().toString(),
      createdAt: Date.now(),
      data
    });
  }
  
  await localforage.setItem('submissions', forms);
};

export const getForms = async (): Promise<FormSubmission[]> => {
  const forms: FormSubmission[] | null = await localforage.getItem('submissions');
  return forms || [];
};

export const getForm = async (id: string): Promise<FormSubmission | undefined> => {
  const forms = await getForms();
  return forms.find(f => f.id === id);
};

export const deleteForm = async (id: string): Promise<void> => {
  const forms = await getForms();
  const updatedForms = forms.filter(f => f.id !== id);
  await localforage.setItem('submissions', updatedForms);
};
