import { mount } from '@vue/test-utils';
import Itunes from  '@/components/Itunes';
import Vue from 'vue';
import Vuetify from 'vuetify';

jest.mock('axios', () => ({
    get: () => Promise.resolve('Itunes Search ​Search Itunes Search itune')
}));

Vue.use(Vuetify)

describe('Itunes', () => {
  
    it('should be form submit', async () => {
        const wrapper = mount(Itunes)

        await wrapper.find('[data-itune]').setValue('itune')
        await wrapper.find('form').trigger('submit.prevent')
        
        expect(wrapper.find('.success').text()).toBe('itune')

        wrapper.vm.$nextTick(() => {
        expect(wrapper.text()).toBe('Itunes Search ​Search Itunes Search itune')
        })
    })
})