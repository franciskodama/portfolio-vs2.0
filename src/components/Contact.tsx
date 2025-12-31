'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';


import { AboutContext } from '../contexts/AboutContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { whyData } from '../data/Data';
import { contactData } from '../data/Data';
import WhyCard from '../components/WhyCard';
import Button from '../components/Button';

let dropSpace = {
  drag: {
    name: 'drag from here:',
    items: contactData,
  },
  drop: {
    name: 'drop here:',
    items: [] as typeof contactData,
  },
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Contact = () => {
  const { location } = useContext(AboutContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('SUBMIT');
  const formContact = useRef(null)

  const [columns, setColumns] = useState(dropSpace);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(true);
  }, []);

  if (!enabled) {
    return <section className='section border-t-[0.2px] border-white/20 pb-40 relative' id='contact'></section>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SENDING...');

    const dragDropMessage = columns.drop.items.map(
      (element) => element.content
    ).join(', ');

    const formData = {
      name: name,
      email: email,
      message: message,
      location: location.data,
      messageDrag: dragDropMessage,
    };

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Email sent successfully:', data.message);
        setStatus('SENT');
        handleClickClearMessage();
        setTimeout(() => {
          setStatus('SUBMIT');
        }, 5000);
      } else {
        console.error('Error sending email:', data.message);
        setStatus('ERROR - TRY AGAIN');
        setTimeout(() => {
          setStatus('SUBMIT');
        }, 5000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('ERROR - TRY AGAIN');
      setTimeout(() => {
        setStatus('SUBMIT');
      }, 5000);
    }
  };

  const handleClickClearMessage = () => {
    setName('');
    setEmail('');
    setMessage('');
    setColumns({
      drag: {
        name: 'drag from here:',
        items: contactData,
      },
      drop: {
        name: 'drop here:',
        items: [],
      },
    });
  };

  return (
    <section className='section border-t-[0.2px] border-white/20 pb-40 relative' id='contact'>
      <div className='container mx-auto w-[90%] mb-8 md-custom:w-[80%] lg-custom:w-[60%]'>
        <h1 className='section-title text-left'>
          hello generator
        </h1>
        <p>{`Let me help you drop me a line! ;)`}</p>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div className='flex flex-col' key={columnId}>
                <h2 className='mt-16 mb-2 uppercase font-main-medium text-third'>{column.name}</h2>
                <div>
                  <Droppable
                    droppableId={columnId}
                    key={columnId}
                    isDropDisabled={false}
                    isCombineEnabled={false}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className='border border-dashed border-bright p-[0.5em_1em] min-h-[7em]'
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'transparent',
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className='inline-block w-auto font-main-light uppercase p-[0.4em_1.2em] select-none cursor-pointer my-2 mr-4 border-[0.5px] border-bright transition-all duration-200 ease-in-out hover:translate-x-[5px] hover:-translate-y-[5px] hover:[box-shadow:var(--color-dark)_-5px_5px_0px_-0.5px,var(--color-bright)_-5px_5px]'
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? 'var(--color-third)'
                                          : 'var(--color-dark)',
                                        color: 'var(--color-bright)',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>

        <form ref={formContact} className='flex flex-col' onSubmit={handleSubmit}>
          <p className='mt-16 mb-2 uppercase font-main-medium text-third'>Additional comments:</p>
          <textarea
            className='mb-8 w-full p-2 bg-bright text-dark h-28'
            placeholder='type some additional comments'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            name='message'
          ></textarea>{' '}
          <div className='flex flex-col md-custom:flex-row'>
            <input
              className='mb-8 w-full p-2 bg-bright text-dark'
              placeholder='name'
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              name='name'
              required
            />
            <input
              className='mb-8 w-full p-2 bg-bright text-dark md-custom:ml-8'
              placeholder='email'
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name='email'
              required
            />
          </div>
          <div className='flex justify-between mt-8 lg-custom:mt-4'>
            <Button
              className={'btn btn--dark-dark-bg'}
              onClick={handleClickClearMessage}
              text='clear'
              align='flex-start'
            />

            <button
              className='btn btn--third-color'
              type='submit'
              style={{
                backgroundColor:
                  status === 'SENT'
                    ? 'var(--color-dark)'
                    : 'var(--color-third)',
              }}
            >
              {status}
            </button>
          </div>
        </form>
      </div>

      <WhyCard
        titleOne={whyData.contact.titleOne}
        textOne={whyData.contact.textOne}
        titleTwo={whyData.contact.titleTwo}
        textTwo={whyData.contact.textTwo}
        titleThree={whyData.contact.titleThree}
        textThree={whyData.contact.textThree}
        titleFour={whyData.contact.titleFour}
        textFour={whyData.contact.textFour}
        observation={whyData.contact.observation}
        bottom={whyData.contact.bottom}
        left={whyData.contact.left}
      />
    </section>
  );
};

export default Contact;
