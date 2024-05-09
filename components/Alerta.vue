<template>
    <div class="error">
      <slot></slot>
    </div>
  </template>
  <style scoped >
  .error{
      padding: 1rem;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 1.6rem;
      text-align: center;
      background-color: var(--blanco);
      border-left: .5rem solid #B91c1c;
      color:#B91c1c ;
      margin-bottom: 2rem;
  }

  </style>