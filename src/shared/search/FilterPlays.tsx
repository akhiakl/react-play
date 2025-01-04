'use client';
import Modal from '@/shared/modal';
import { useState, useEffect } from 'react';
import './search.css';
import orderBy from 'lodash/orderBy';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import useFetchFilterData from './hooks/usePlayFilter';

import { FIELD_TEMPLATE, FieldTemplate } from './filter-template';
import { TextField, Checkbox, Autocomplete } from '@mui/material';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import { GiSettingsKnobs } from 'react-icons/gi';

const icon = <BiCheckbox size={30} />;
const checkedIcon = <BiCheckboxChecked size={30} />;

type Props = {
  onChange: (args: Record<string, any>) => void;
  query: Record<string, string | string[]>;
};

const FilterPlays = ({ onChange, query }: Props) => {
  const [loading, error, data] = useFetchFilterData();
  const [loadedData, setLoadedData] = useState<Record<string, any>>({});
  const [formData, setFormData] = useState<Record<string, any>>({});

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!loading && !error) {
      const updatedData = {
        ...data,
        languages: [
          {
            name: 'JavaScript',
            value: 'js',
            icon: 'https://res.cloudinary.com/dgtdljyul/image/upload/v1675411496/js_jjnhvy.png'
          },
          {
            name: 'TypeScript',
            value: 'ts',
            icon: 'https://res.cloudinary.com/dgtdljyul/image/upload/v1675409456/ts_yrzjge.png'
          }
        ]
      };
      setLoadedData(updatedData);
    }
  }, [query, loading, showModal]);

  // This useEffect ensures that once the filter plays modal is closed, the focus is returned back to the filter plays button
  useEffect(() => {
    const filterPlaysBtn = document.getElementById('filterPlaysBtn');
    if (!showModal && filterPlaysBtn) {
      filterPlaysBtn.focus();
    }
  }, [showModal]);

  const filterModalCloseBtnHandler = () => {
    setShowModal(false);
  };

  const loadFilter = () => {
    const newFormData: Record<string, any> = {};
    FIELD_TEMPLATE.forEach((template) => {
      if (template.datafield === 'text') {
        const text = (query?.text as string)?.split('+').join(' ') ?? '';

        newFormData['text'] = decodeURIComponent(text);
      } else {
        if (query[template.datafield]) {
          newFormData[template.datafield] = [];
          const splitData = isArray(query[template.datafield])
            ? (query[template.datafield] as string[])
            : (query[template.datafield] as string).split(',');
          splitData.forEach((data) => {
            const found = loadedData[template.datafield]?.filter((d: any) => {
              if (template.node) {
                return d[template.node][template.fieldValue] === data;
              } else {
                return d[template.fieldValue] === data;
              }
            })[0];
            if (found) {
              newFormData[template.datafield].push(found);
            }
          });
        }
      }
    });
    setFormData(newFormData);
  };

  const showFilterModal = () => {
    if (query) {
      loadFilter();
    } else {
      setFormData({});
    }
    setShowModal(true);
  };

  const handleFilter = () => {
    const res: Record<string, any> = {};
    FIELD_TEMPLATE.forEach((template) => {
      if (formData[template.datafield]) {
        res[template.datafield] = [];
        if (isArray(formData[template.datafield])) {
          formData[template.datafield].forEach((data: any) => {
            res[template.datafield].push(
              template.node ? data[template.node][template.fieldValue] : data[template.fieldValue]
            );
          });
        } else {
          res[template.datafield] = formData[template.datafield];
        }
      }
    });

    const finalQueryObject: Record<string, any> = {};
    Object.keys(res).forEach((key) => {
      if (res[key] && res[key].length) {
        finalQueryObject[key] = res[key];
      }
    });
    setShowModal(false);
    onChange({ ...finalQueryObject });
  };

  const handleChange = (key: string, value: string) => {
    setFormData((pre) => ({ ...pre, [key]: value }));
  };

  if (loading) {
    return <p />;
  }

  const getOptionNode = (field: FieldTemplate, option: any) => {
    if (field.node) {
      return option[field.node];
    }

    return option;
  };

  const renderFiled = (field: FieldTemplate) => {
    switch (field.type) {
      case 'select':
        return (
          <Autocomplete
            disableCloseOnSelect
            freeSolo={field.freeSolo}
            getOptionLabel={(option) =>
              field.node ? option[field.node][field.fieldName] : option[field.fieldName]
            }
            id={field.datafield}
            multiple={field.multiple}
            options={
              field.sorted
                ? orderBy(loadedData[field.datafield], [field.fieldName], ['asc'])
                : loadedData[field.datafield]
            }
            renderInput={(params) => (
              <TextField {...params} placeholder={field.placeholder} size="small" />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  checked={selected}
                  checkedIcon={checkedIcon}
                  icon={icon}
                  style={{ padding: 0 }}
                />
                <div
                  className={`flex md-ml-8 min-w-0 ml-2 ${field.datafield == 'creators' ? '!justify-start w-full' : null} items-center`}
                >
                  <span
                    className={`${field.datafield == 'creators' ? 'ml-4 mr-3' : null} rounded-full`}
                  >
                    {field.avatar && getOptionNode(field, option)[field.avatar] ? (
                      <span className="flex items-center justify-center md-h-12 h-8 md-w-16 w-8 mr-4">
                        <img
                          alt="avatar"
                          className="md-h-12 w-8 md-w-12 h-8 rounded-full"
                          src={getOptionNode(field, option)[field.avatar]}
                        />
                      </span>
                    ) : null}
                  </span>
                  <span
                    className={`break-words min-w-0 ${field.datafield == 'creators' ? 'truncate' : null}`}
                    title={
                      field.datafield == 'creators' && field.node
                        ? option[field.node][field.fieldName]
                        : ''
                    }
                  >
                    {field.node ? option[field.node][field.fieldName] : option[field.fieldName]}
                  </span>
                </div>
              </li>
            )}
            size="small"
            value={
              !formData[field.datafield] ? (field.multiple ? [] : '') : formData[field.datafield]
            }
            onChange={(e, newValue) => {
              let updatedval = newValue;
              if (field.multiple) {
                updatedval = [];
                newValue.forEach((v: any) => {
                  if (isObject(v)) {
                    updatedval.push(v);
                  } else {
                    updatedval.push({
                      [field.fieldName || 'name']: v,
                      [field.fieldValue || 'value']: ''
                    });
                  }
                });
              }
              handleChange(field.datafield, updatedval);
            }}
          />
        );
      case 'text':
        return (
          <TextField
            className="w-full"
            size="small"
            value={formData[field.datafield]}
            onChange={(e) => handleChange(field.datafield, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="search-filter">
      <Modal
        cname="filter"
        show={showModal}
        title="Filter Plays By"
        onClose={filterModalCloseBtnHandler}
        onSubmit={handleFilter}
      >
        {FIELD_TEMPLATE.map((field, field_i) => {
          return (
            <div className="flex-filter-modal flex-col md:flex-row p-2" key={field_i}>
              <div className="w-32">
                {field.display}
                {field.required ? '*' : ''}
              </div>
              <div className="flex-1">{renderFiled(field)}</div>
            </div>
          );
        })}
      </Modal>

      <button
        className="btn-filter"
        id="filterPlaysBtn"
        title="Filter Plays"
        onClick={() => {
          showFilterModal();
        }}
      >
        {query && Object.keys(query).length > 0 ? (
          <div className="badge">{Object.keys(query).length}</div>
        ) : null}

        <GiSettingsKnobs className="icon" color="var(--color-neutral-30)" size="28px" />
      </button>
    </div>
  );
};

export default FilterPlays;
