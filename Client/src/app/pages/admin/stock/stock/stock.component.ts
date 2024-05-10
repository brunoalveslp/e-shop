import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Type } from 'src/app/shared/models/type';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { StockMoviment} from 'src/app/shared/models/stockMoviment';
import { Product } from 'src/app/shared/models/product';
import { Size } from 'src/app/shared/models/size';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-types',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'productId', 'productName', 'sizeName', 'quantity', 'movimentType'];
  stockMoviments: StockMoviment[] = [];
  dataSource = new MatTableDataSource<StockMoviment>(this.stockMoviments);
  public shopParams: ShopParams = new ShopParams();
  public totalCount: number = 0;
  filter: string;
  products: Product[] = [];
  sizes: Size[] = [];
  modalRef: BsModalRef;
  isEdit = false;

  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };




  constructor(private fb: FormBuilder, public stockService: StockService, private modalService: BsModalService, private router: Router) { }

  movimentForm = this.createForm();

  ngOnInit(): void {
    this.getProducts();
    this.getSizes();
    this.getStockMoviments();

    this.dataSource.filterPredicate = (data: StockMoviment, filter: string) => {
      return data.sizeName.toLowerCase().includes(filter.toLowerCase()) ||
        (data.productName.toLowerCase().includes(filter) &&
          data.sizeName.toLowerCase() == filter) ||
        data.productId.toString().includes(filter.toLowerCase()) ||
        data.id.toString().includes(filter.toLowerCase()) ||
        data.quantity.toString().includes(filter.toLowerCase()) ||
        data.movimentType.toLowerCase().includes(filter.toLowerCase());
    };
  }

  ngAfterViewInit() {
    this.getStockMoviments();
  }

  trackByProductId(index: number, moviment: any): string {
    return moviment.productId;
  }

  getProducts() {
    this.stockService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data.sort((a, b) => a.id - b.id);
        this.shopParams.pageSize = response.pageSize;
        this.shopParams.pageNumber = response.pageIndex;
        this.totalCount = response.count;
      },
      error: (error) => console.assert(error),
    });
  }

  getSizes() {
    this.stockService.getSizes().subscribe(sizes => {
      this.sizes = sizes;
    });
  }

  getStockMoviments() {
    this.stockService.getStockMovimentation().subscribe(moviments => {
      this.stockMoviments = moviments;
      this.dataSource.data = this.stockMoviments;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data)
    });
  }

  applyFilter() {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  onSubmit() {
    if (this.movimentForm.valid) {
      const moviment = this.movimentForm.value;
      const movimentType = moviment.movimentType?.trim().toLowerCase();
      if (movimentType == "entrada" && moviment.productId != null && moviment.sizeId != null && moviment.quantity != null && moviment.quantity > 0) {
        console.log('entrou')
        this.stockService.stockEntry(moviment.productId, moviment.sizeId, moviment.quantity).subscribe(() => {
          this.getStockMoviments();
          this.closeModal();
        });
      } else if (movimentType == "saida" && moviment.productId != null && moviment.sizeId != null && moviment.quantity != null && moviment.quantity > 0) {
        this.stockService.stockOutgoing(moviment.productId, moviment.sizeId, moviment.quantity).subscribe(() => {
          this.getStockMoviments();
          this.closeModal();
        });
      }
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHide?.subscribe((reason: string | any) => {
      if (reason === 'backdrop-click') {
        this.clearEntity();
      }
    });
  }

  closeModal() {
    this.modalRef.hide();
    this.clearEntity();
  }

  clearEntity() {
    this.movimentForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      productId: 0,
      sizeId: 1,
      quantity: 0,
      movimentType: ''
    });
  }
}
