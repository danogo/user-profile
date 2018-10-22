import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

describe('Modal', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      onBtnClick: jest.fn(),
      showModal: false
    }
    wrapper = shallow(<Modal {...mockProps}/>);
  });

  test('component renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('modal is hidden by default', () => {
    expect(wrapper.hasClass('hideModal')).toBe(true);
  })

  test('receives onClick handler', () => {
    expect(wrapper.find('button').props().onClick).toBe(mockProps.onBtnClick);
  });

  test('callback is called when user clicks exit btn', () => {
    const btn = wrapper.find('button');
    btn.prop('onClick')();
    expect(mockProps.onBtnClick).toHaveBeenCalledTimes(1);
  })
});