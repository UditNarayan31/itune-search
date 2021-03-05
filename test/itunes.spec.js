import { mount } from '@vue/test-utils';
import Itunes from  '@/components/Itunes';
import Vue from 'vue';
import Vuetify from 'vuetify';

jest.mock('axios', () => ({
    get: () => Promise.resolve('Itunes Search ​ Search')
}));

Vue.use(Vuetify)

describe('Itunes', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(Itunes)
    })
    it('should be form submit', async () => {
        
        await wrapper.find('[data-itune]').setValue('itunes')
        await wrapper.find('form').trigger('submit.prevent')
        
        expect(wrapper.find('.success').text()).toBe('itunes')
    }),

    it('mocking api after form submit', () => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.text()).toBe('Itunes Search ​ Search')
        })
    })

    it('should pagination inc desc.',() => {
        const wrapper = mount(Itunes)
       wrapper.find('#inc').trigger('click')
       wrapper.find('#desc').trigger('click')
       expect(wrapper.find('.title').text()).toBe('page')
    })
})