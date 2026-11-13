// SINGLE SOURCE OF TRUTH for phone numbers shown anywhere on the site.
// To swap which number is primary, swap the two objects below.

export const PHONE_PRIMARY = {
  display: '+91 91691 66667',
  tel: '+919169166667',
  wa: '919169166667', // wa.me format: country code + number, digits only
};

export const PHONE_SECONDARY = {
  display: '+91 91546 77777',
  tel: '+919154677777',
  wa: '919154677777',
};

export const EMAIL_SALES = 'sales@sumanthminerals.com';

export const whatsappUrl = (text = '') =>
  `https://wa.me/${PHONE_PRIMARY.wa}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
