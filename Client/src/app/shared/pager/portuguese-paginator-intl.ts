import { MatPaginatorIntl } from '@angular/material/paginator';

const portugueseRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 de ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
}


export function getPortuguesePaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Itens por pagina:';
  paginatorIntl.nextPageLabel = 'Ir para a pagina';
  paginatorIntl.previousPageLabel = 'Voltar a pagina';
  paginatorIntl.getRangeLabel = portugueseRangeLabel;

  return paginatorIntl;
}
