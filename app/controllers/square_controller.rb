class SquareController < ApplicationController
  def index
    @square = Square.all
  end

  def new
    @square = Square.new
  end

  def show
    @square = Square.find(params[:id])
  end

    private

  def square_params
    params.require(:square).permit(:track, :x, :y)
  end
end
