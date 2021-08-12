import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {User} from "../../../interfaces/user.interface";
import {Ticket} from "../../../interfaces/ticket.interface";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {selectAllUser, selectUserLoading} from "../../store/user/user.selector";
import {selectAllTicket, selectTicketLoading} from "../../store/ticket/ticket.selector";
import {map} from "rxjs/operators";
import {TicketCreateRequested} from "../../store/ticket/ticket.action";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  // public readonly users$: Observable<User[]> = this.backendService.users();
  // public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();
  public users$: Observable<User[]>;
  public tickets$: Observable<Ticket[]>;
  public loading$: Observable<boolean>;

  constructor(protected store: Store<any>) { }

  ngOnInit(): void {
    this.users$ = this.store.pipe(
        select(selectAllUser)
    );
    this.tickets$ = this.store.pipe(
        select(selectAllTicket)
    );

    this.loading$ = combineLatest([
      this.store.select(selectUserLoading),
      this.store.select(selectTicketLoading)
    ]).pipe(
        map(([userLoading, ticketLoading]) => userLoading || ticketLoading)
    )

    // setInterval(() => {
    //   this.store.dispatch(TicketCreateRequested({description: 'Test test'}))
    // }, 5000)
  }

}
