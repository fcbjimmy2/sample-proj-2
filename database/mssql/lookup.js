export default function (knex) {
  const getLookupMasters = async () => {
    const result = await knex.select('*').from('lookup_master');
    return result;
  };

  const getLookups = async (catergory, name) => {
    const result = await knex
      .select('*')
      .from('lookup')
      .where('catergory', '=', catergory)
      .andWhere('name', '=', name);
    return result;
  };

  const getLookupsByCatergory = async (catergory) => {
    if (catergory === 'lookup') {
      const result = await knex
        .select(
          'l.*',
          'm.lang_en as name_lang_en',
          'm.lang_zh_hant as name_lang_zh_hant',
          'm.lang_zh_hans as name_lang_zh_hans'
        )
        .from('lookup as l')
        .leftJoin('lookup_master AS m', 'l.name', '=', 'm.name')
        .where('l.catergory', '=', 'lookup');
      return result;
    } else {
      const result = await knex.select('*').from('lookup').where('catergory', '=', catergory);
      return result;
    }
  };

  const getLookup = async (idx) => {
    const result = await knex('lookup').first('*').where('idx', '=', idx);
    return result;
  };

  const getLookupByCatergory = async (catergory, idx) => {
    if (catergory === 'lookup') {
      const result = await knex
        .select(
          'l.*',
          'm.lang_en as name_lang_en',
          'm.lang_zh_hant as name_lang_zh_hant',
          'm.lang_zh_hans as name_lang_zh_hans'
        )
        .from('lookup as l')
        .leftJoin('lookup_master AS m', 'l.name', '=', 'm.name')
        .where('l.catergory', '=', 'lookup')
        .andWhere('l.idx', '=', idx);
      return result.length > 0 ? result[0] : undefined;
    } else {
      const result = await knex('lookup')
        .first('*')
        .where('catergory', '=', catergory)
        .andWhere('idx', '=', idx);
      return result;
    }
  };

  const insertLookup = async (catergory, name, value, text, en, zh_hant, zh_hans) => {
    const lookup = {
      catergory: catergory,
      name: name,
      value: value,
      text: text,
      lang_en: en,
      lang_zh_hant: zh_hant,
      lang_zh_hans: zh_hans,
    };
    const insertIds = await knex('lookup').insert(lookup);
    return insertIds[0];
  };

  const updateLookupByCatergory = async (catergory, idx, text, en, zh_hant, zh_hans) => {
    const lookup = {
      text: text,
      lang_en: en,
      lang_zh_hant: zh_hant,
      lang_zh_hans: zh_hans,
    };
    await knex('lookup')
      .update(lookup)
      .where('catergory', '=', catergory)
      .andWhere('idx', '=', idx);
  };

  const deleteLookupByCatergory = async (catergory, idx) => {
    await knex('lookup').where('catergory', '=', catergory).andWhere('idx', '=', idx).del();
  };

  const getLookupCountry = async () => {
    const result = await knex.select('*').from('lookup_country');
    return result;
  };

  const getLookupTimeZone = async () => {
    const result = await knex.select('*').from('lookup_time_zone');
    return result;
  };

  return {
    getLookupMasters,
    getLookups,
    getLookupsByCatergory,
    getLookup,
    getLookupByCatergory,
    insertLookup,
    updateLookupByCatergory,
    deleteLookupByCatergory,
    getLookupCountry,
    getLookupTimeZone,
  };
}
