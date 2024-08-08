import { defineStore } from 'pinia';

export const commentStore = defineStore('commentStore', {
    state: () => ({
        selectedTypeName: null,
        selectedSubjectName: null,
        selectedSubjectId: null
    })
});
