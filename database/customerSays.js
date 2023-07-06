import _mock from './mock/_mock';

export default function (mysqlPool) {
    
  const getCustomerSays = () => {
    return [...Array(8)].map((_, index) => ({
      id: _mock.id(index),
      name: _mock.name.fullName(index),
      role: _mock.role(index),
      avatar: _mock.image.avatar(index),
      rating: 5,
      review:
        'Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I appreciate there attitude and approach.',
    }));
  };

  return {
    getCustomerSays
  }
};